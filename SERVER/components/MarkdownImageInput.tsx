import React, { useCallback, useMemo, useRef, useState } from 'react'
import { type StringInputProps, set, unset, useClient } from 'sanity'

function computeStats(raw: string) {
  const chars = raw.length
  // Strip image syntax and link URLs so URLs don't inflate word counts
  const plain = raw
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>~|\-]+/g, ' ')
    .trim()

  const latinWords = plain ? plain.split(/\s+/).filter(Boolean).length : 0
  const readMins = Math.max(1, Math.ceil(latinWords / 220))
  return { words: latinWords, chars, readMins }
}

export function MarkdownImageInput(props: StringInputProps) {
  const { value = '', onChange, elementProps } = props
  const stats = useMemo(() => computeStats(value || ''), [value])
  const client = useClient({ apiVersion: '2026-11-23' })
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)

  const insertAtCursor = useCallback(
    (snippet: string) => {
      const current = value || ''
      const el = textareaRef.current
      if (!el) {
        onChange(set(`${current}${current ? '\n\n' : ''}${snippet}`))
        return
      }
      const start = el.selectionStart ?? current.length
      const end = el.selectionEnd ?? current.length
      const next = current.slice(0, start) + snippet + current.slice(end)
      onChange(set(next))
      window.setTimeout(() => {
        el.focus()
        const pos = start + snippet.length
        el.setSelectionRange(pos, pos)
      }, 0)
    },
    [value, onChange]
  )

  const uploadImages = useCallback(
    async (files: FileList | File[]) => {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
      if (imageFiles.length === 0) return

      setUploading(true)
      setStatusMsg(`Uploading ${imageFiles.length} image(s) to Sanity CDN...`)
      try {
        const snippets: string[] = []
        for (const file of imageFiles) {
          const asset = await client.assets.upload('image', file, { filename: file.name })
          const alt = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
          snippets.push(`![${alt}](${asset.url})`)
        }
        insertAtCursor(`\n${snippets.join('\n\n')}\n`)
        setStatusMsg(`Uploaded ${imageFiles.length} image(s) and inserted Markdown.`)
      } catch (err) {
        setStatusMsg(
          `Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`
        )
      } finally {
        setUploading(false)
        if (fileInputRef.current) fileInputRef.current.value = ''
      }
    },
    [client, insertAtCursor]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        const hasImage = Array.from(e.dataTransfer.files).some((f) =>
          f.type.startsWith('image/')
        )
        if (hasImage) {
          e.preventDefault()
          void uploadImages(e.dataTransfer.files)
        }
      }
    },
    [uploadImages]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = e.clipboardData?.files
      if (items && items.length > 0) {
        const hasImage = Array.from(items).some((f) => f.type.startsWith('image/'))
        if (hasImage) {
          e.preventDefault()
          void uploadImages(items)
        }
      }
    },
    [uploadImages]
  )

  const btnStyle: React.CSSProperties = {
    padding: '5px 10px',
    fontSize: '12px',
    fontWeight: 600,
    borderRadius: '6px',
    border: '1px solid #d4d4d8',
    background: '#ffffff',
    color: '#18181b',
    cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Markdown Quick Toolbar + Image Upload */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '6px',
          padding: '8px',
          borderRadius: '8px',
          background: '#f4f4f5',
          border: '1px solid #e4e4e7',
        }}
      >
        <button type="button" style={btnStyle} onClick={() => insertAtCursor('\n## Heading 2\n')}>
          H2
        </button>
        <button type="button" style={btnStyle} onClick={() => insertAtCursor('\n### Heading 3\n')}>
          H3
        </button>
        <button type="button" style={btnStyle} onClick={() => insertAtCursor('**bold text**')}>
          Bold
        </button>
        <button
          type="button"
          style={btnStyle}
          onClick={() => insertAtCursor('[Link Text](/private-label)')}
        >
          Link
        </button>
        <button
          type="button"
          style={btnStyle}
          onClick={() =>
            insertAtCursor(
              '\n| Spec | Standard | Custom OEM |\n|---|---|---|\n| MOQ | 500 units | 2,000 units |\n'
            )
          }
        >
          Table
        </button>

        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...btnStyle,
            marginLeft: 'auto',
            background: '#F5C443',
            borderColor: '#D97706',
            color: '#1E1B16',
            fontWeight: 700,
          }}
        >
          {uploading ? 'Uploading...' : '+ Upload Image'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files) void uploadImages(e.target.files)
          }}
        />
      </div>

      {/* Markdown Textarea (supports drag-drop & paste image upload) */}
      <textarea
        ref={textareaRef}
        id={elementProps.id}
        readOnly={elementProps.readOnly}
        onFocus={elementProps.onFocus}
        onBlur={elementProps.onBlur}
        value={value}
        onChange={(e) => {
          const v = e.target.value
          onChange(v ? set(v) : unset())
        }}
        onDrop={handleDrop}
        onPaste={handlePaste}
        rows={18}
        placeholder="Write Markdown here... (Supports ## headings, **bold**, lists, tables, and drag-and-drop / Ctrl+V image upload)"
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #d4d4d8',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          fontSize: '13px',
          lineHeight: 1.6,
          resize: 'vertical',
          background: '#ffffff',
          color: '#18181b',
          boxSizing: 'border-box',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          fontSize: '12px',
          color: '#52525b',
          padding: '6px 10px',
          borderRadius: '6px',
          background: '#fafafa',
          border: '1px solid #e4e4e7',
        }}
      >
        <span>
          <strong>Words:</strong> {stats.words.toLocaleString()} &nbsp;·&nbsp;{' '}
          <strong>Characters:</strong> {stats.chars.toLocaleString()} &nbsp;·&nbsp;{' '}
          <strong>Est. read:</strong> {stats.words > 0 ? `${stats.readMins} min` : '0 min'}
        </span>
        <span style={{ fontSize: '11px', color: '#71717a' }}>
          {statusMsg || 'Supports + Upload Image, drag & drop, or Ctrl+V paste'}
        </span>
      </div>
    </div>
  )
}
