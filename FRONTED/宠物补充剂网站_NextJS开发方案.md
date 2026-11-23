# 宠物补充剂定制网站 · Next.js 开发方案

> 技术栈：**Next.js (App Router) → Vercel（前端托管）→ Cloudflare（前置 DNS/CDN/WAF）→ Sanity（内容后端）**
> 项目性质：B2B 宠物补充剂 OEM/ODM 代工厂获客站，内容密集、页面上千、多语言、SEO 导流
> 配套文档：`宠物补充剂定制网站_页面结构.md`（sitemap / slug 映射 / 页面模板）
> 编制日期：2026-11-23

---

## 0. 结论先行

- **Next.js 用 App Router + Server Components**，静态页用 `generateStaticParams` 预生成，内容更新走 Sanity webhook 按需 revalidate，不依赖定时重建。
- **Vercel 自身就是全球边缘 CDN**。Cloudflare 前置的收益在 DNS 解析、WAF、DDoS 和中国大陆访问线路，**不是"再缓存一遍"**。双重缓存是这套架构最大的坑，必须用 Cache Rules 排除 HTML 和 API。
- **Cloudflare 接法推荐先走 A 方案（仅 DNS / 灰云）**：最稳、无证书冲突、无缓存干扰。等确实需要 WAF/DDoS 再切 B 方案（橙云代理）+ 配套缓存规则。
- **Sanity 是唯一内容源**，前端不存业务数据；询盘表单走 Vercel Route Handler 发邮件/转发，不进 Sanity。

### 请求链路

```
用户 → Cloudflare（DNS / 可选 WAF+缓存）→ Vercel Edge（CDN + ISR）
     → Next.js Server Component → Sanity CDN（GROQ 查询，带 tag 缓存）
     
内容变更：Sanity Studio 发布 → Webhook → /api/revalidate → revalidateTag/Path → Vercel 重新生成 → 用户看到新内容
```

---

## 1. 版本与依赖

| 项 | 版本 / 包 | 说明 |
|---|---|---|
| Next.js | **16+** | webhook 的 `revalidateTag` 双参数写法是 16 起要求 |
| next-sanity | **12+** | 提供 `parseBody`（webhook 签名校验 + 解析） |
| sanity | 最新稳定 | Studio + schema |
| @sanity/image-url | 最新 | 图片 URL 构建 |
| React | 随 Next.js 16 | — |

安装：`npm i next react react-dom sanity next-sanity @sanity/image-url`

---

## 2. 项目目录结构

```
src/app/
├── layout.tsx                              # 根布局：Header/Footer/GTM/字体/metadata
├── page.tsx                                # 首页 /
├── contact-us/page.tsx                     # 询盘页 /
├── [slug]/page.tsx                         # 核心页：5剂型/关于/质量/流程/FAQ
├── private-label/
│   ├── page.tsx                            # /private-label/
│   └── [form]/
│       ├── page.tsx                        # /private-label/{剂型}/
│       └── [product]/page.tsx              # /private-label/{剂型}/{产品}/
├── custom-formulation/
│   ├── page.tsx
│   ├── ingredients/[ingredient]/page.tsx
│   ├── effects/[effect]/page.tsx
│   ├── by-pet/[pet]/page.tsx
│   └── [pet]/[form]/[effect]/page.tsx      # 交叉组合页（程序化）
├── insights/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── api/
│   ├── revalidate/route.ts                 # Sanity webhook 入口
│   └── inquiry/route.ts                    # 询盘表单提交
├── sitemap.ts                              # 自动生成 sitemap.xml
├── robots.ts
└── studio/[[...tool]]/page.tsx             # 嵌入 Sanity Studio（可选）

src/components/sections/                    # 与页面结构文档 4.x 模板一一对应
├── Hero.tsx   DataBar.tsx   FeatureGrid.tsx  ProcessSteps.tsx
├── SpecTable.tsx   QualityTrio.tsx   Certification.tsx
├── CaseStudies.tsx  FAQ.tsx  ProductGrid.tsx  RelatedLinks.tsx  CTA.tsx

sanity/
├── schemaTypes/{page,dosageForm,product,ingredient,effect,pet,article}.ts
└── lib/{client,queries,image}.ts
sanity.config.ts                            # 项目根
```

---

## 3. Sanity 内容模型（schema 要点）

| 文档类型 | 关键字段 | 驱动页面 |
|---|---|---|
| `page` | title / slug / sections[] / metaTitle / metaDescription | `[slug].astro`→`[slug]/page.tsx`（剂型页、关于、质量、流程、FAQ） |
| `dosageForm` | name / slug / techPoints / processSteps / specs / moq / faq | 5 个剂型制造页数据 |
| `product` | name / slug / form(ref) / functions[] / species[] / ingredients / moq / leadTime | 产品落地页 |
| `ingredient` / `effect` / `pet` | name / slug / description | 配方库三维度 + 交叉页 |
| `article` | title / slug / body(Portable Text) / related / SEO | 博客 |

**硬性规范（写进 schema 校验，别靠人工记）**：
- slug 小写、连字符分隔、禁 `_`/括号/非 ASCII —— 防 `_id` 与 slug 不一致（ginkvora 踩过的坑）。
- `metaTitle ≤ 62`、`metaDescription ≤ 159`，超限直接报错。
- 内链（产品→剂型→询盘）用 Sanity reference / 显式 URL 字段存，**不要运行时正则匹配正文**。

---

## 4. 数据获取与页面生成

```ts
// sanity/lib/client.ts
import { createClient } from 'next-sanity'
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-11-23',
  useCdn: true,          // 生产走 CDN；draft mode 时关掉
})
```

```ts
// src/app/[slug]/page.tsx（所有 CMS 驱动页共用这一套）
export const revalidate = 60        // ISR 兜底；主刷新靠 webhook

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(
    `*[_type == "page" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const p = await client.fetch(`*[_type == "page" && slug.current == $slug][0]{metaTitle,metaDescription}`, { slug })
  return { title: p?.metaTitle, description: p?.metaDescription }
}
```

> 交叉组合页（`/custom-formulation/[pet]/[form]/[effect]`）用三组 slug 笛卡尔积生成 `generateStaticParams`；先控制规模（约 3 物种 × 5 剂型 × 15 功效 = 225 页），别一次铺到几千页。

---

## 5. 内容更新：Sanity Webhook → 按需 Revalidate

官方推荐用 `next-sanity/webhook` 的 `parseBody` 校验 HMAC 签名（比手写校验稳）。

```ts
// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return new Response('missing secret', { status: 500 })

  const { isValidSignature, body } = await parseBody(req, secret, true)
  if (!isValidSignature) return new Response('invalid signature', { status: 401 })

  switch (body?._type) {
    case 'product':
      revalidateTag('products')
      if (body.slug?.current) revalidatePath(`/private-label/${body.form}/${body.slug.current}`)
      revalidatePath('/private-label')
      break
    case 'page':
      if (body.slug?.current) revalidatePath(`/${body.slug.current}`)
      revalidatePath('/')
      break
    case 'article':
      revalidateTag('articles')
      revalidatePath('/insights')
      break
  }
  return Response.json({ revalidated: true, now: Date.now() })
}
```

Sanity 控制台配置（Manage → API → Webhooks）：
- URL：`https://<你的域名>/api/revalidate`
- Dataset：production
- Trigger：Create / Update / Delete
- Filter：`_type in ["page","product","article","dosageForm","ingredient","effect","pet"]`
- Secret：与 `SANITY_REVALIDATE_SECRET` 同值

> **Cloudflare 注意**：如果 orange-cloud 代理且开了 HTML 缓存，webhook 刷新了 Vercel 但用户仍拿到 CF 的旧 HTML。见第 7 节缓存规则——**必须 bypass HTML**。

---

## 6. Vercel 部署配置

| 配置项 | 值 |
|---|---|
| Framework | Next.js（自动识别） |
| Build command | `next build` |
| Output | `.next`（默认） |
| Node version | 20.x 或 22.x |
| 环境变量 | 见第 8 节 |
| 自定义域名 | 绑定到 Vercel，DNS 由 Cloudflare 托管（见第 7 节） |
| Preview | 开启；Sanity Studio 的 draft 走 Preview 部署验证 |

- 图片：`next.config.ts` 的 `images.remotePatterns` 放行 `cdn.sanity.io`，否则 `next/image` 加载 Sanity 图片全部报 400。
- 构建期拉 Sanity：`useCdn: true` 即可；CI 无网络时给 fetch 加重试。

---

## 7. Cloudflare 前置配置（重点）

### 两种接法

| 方案 | DNS 记录 | 优点 | 代价 / 适用 |
|---|---|---|---|
| **A. 仅 DNS（灰云，推荐先上）** | CNAME → `cname.vercel-dns.com`，Proxy 状态关闭 | 无证书冲突、无缓存干扰，Vercel 自身 CDN 已够快 | 拿不到 CF 的 WAF/DDoS；适合先上线跑通 |
| **B. 橙云代理（Proxied）** | 同上但 Proxy 开启 | WAF、DDoS、Bot 管理、中国线路优化 | 必须配好 SSL + Cache Rules；双 CDN 排查复杂 |

> 若走 B 方案，SSL 模式设 **Full**（不要 Flexible，会无限重定向）；证书问题优先让 Vercel 完成签发再切橙云。

### B 方案必配 Cache Rules（否则 ISR 失效）

| 规则 | 匹配 | 动作 |
|---|---|---|
| 1 | `http.request.uri.path` 以 `/api/` 开头 | **Bypass cache**（webhook、表单、revalidate 绝不能被缓存） |
| 2 | `http.request.header.content_type` 含 `text/html` 或 URI 路径无扩展名 | **Bypass cache**（HTML 交给 Vercel ISR 管） |
| 3 | 静态资产 `_next/static/*`、图片 | Cache，TTL 可长（1 年 + immutable） |
| 4 | `sitemap.xml` / `robots.txt` | Bypass 或短 TTL（5 分钟） |

> Cloudflare 的 `Vary` 规则（2026 已全套餐开放）可用来规范 `Accept`/`Accept-Language`，但对高熵请求头不要原样透传，否则缓存键基数爆炸、命中率暴跌。本场景不需要，保持默认即可。

---

## 8. 环境变量

```env
# 本地 .env.local / Vercel Project Settings 同配
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-11-23
SANITY_REVALIDATE_SECRET=<随机长字符串，与 CF Webhook Secret 同值>
SANITY_API_READ_TOKEN=<只在前台预览 draft 时需要，最小权限>

# 询盘表单（按你选的投递方式二选一）
RESEND_API_KEY=
# 或
INQUIRY_WEBHOOK_URL=
```

---

## 9. 性能与图片

- 静态页全部 Server Component，零客户端 JS；交互（FAQ 折叠、表单）才用 `'use client'`。
- Sanity 图片 → `urlFor(...).url()` → `next/image`，配合 `remotePatterns`。
- 字体用 `next/font` 自托管，避免 Google Fonts 在中国被墙拖慢（Cloudflare 前置也救不了字体的跨境链路）。
- 不要给整站加 `force-dynamic`；只对询盘成功后回显等真动态片段用。

---

## 10. 落地顺序

| 阶段 | 内容 | 优先级 |
|---|---|---|
| 1 | Next.js 骨架 + Sanity schema + client + 首页 + 5 剂型页 + 询盘页 | **P0** |
| 2 | webhook revalidate + sitemap/robots + Vercel 部署 + Cloudflare A 方案（仅 DNS） | **P0** |
| 3 | 白牌目录 + 产品落地页 + 质量/工厂/关于/FAQ | **P1** |
| 4 | 配方库三维度 + 交叉页 + 博客 | **P2** |
| 5 | 按需切 Cloudflare B 方案（WAF/DDoS）+ Cache Rules | **P2** |
| 6 | 多语言（EN 先行，再按市场加 `/{lang}/` 前缀） | P3 |

---

## 11. 踩坑清单

1. **Cloudflare 缓存了 HTML** → Sanity 发布后前台不更新。解决：Cache Rules bypass HTML 与 `/api/*`。
2. **`_id` 与 slug 不一致** → 页面 404。解决：slug 在 Sanity schema 层做正则校验。
3. **Sanity 图片全裂** → `next/image` 未放行 `cdn.sanity.io`。解决：配 `remotePatterns`。
4. **webhook 被伪造** → 任何人可刷缓存。解决：`parseBody` 验签 + 密钥只存环境变量。
5. **构建期 Sanity 拉取失败** → 部署红。解决：CI 网络检查 + fetch 重试 + 保留上一次构建。
6. **交叉页一次生成几千页** → 构建超时、sitemap 爆炸。解决：分批扩，先 225 页。
7. **Vercel 自定义域名证书卡住** → 先灰云让 Vercel 签完证书，再决定是否切橙云。
8. **询盘表单被 Cloudflare 拦** → WAF 规则放行 `/api/inquiry`，或给表单入口加 Turnstile。

---

## 12. 上线前置检查

- [ ] Vercel 环境变量与本地 `.env.local` 一致
- [ ] Sanity webhook 用真实发布事件测过一次 revalidate（看 Vercel 日志）
- [ ] `sitemap.xml` 覆盖所有页面，无 `blog/` 等历史遗留前缀
- [ ] Cloudflare Cache Rules 已放行 `/api/*` 和 HTML
- [ ] 询盘表单端到端测试：提交 → 收到邮件 → 无 CF 拦截
- [ ] 提交 sitemap URL 清单给 GSC
