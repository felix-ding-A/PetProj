# Prosafenutra 网站内容拆解

> 来源：[https://prosafenutra.com/](https://prosafenutra.com/)
> 类型：B2B 补充剂 OEM/ODM 代工厂获客站（非零售商城）
> 拆解日期：2026-11-23

---

## 结论先行

Prosafenutra 不是一个"产品商城"，而是一个**代工厂获客站**。它的全部内容只服务一件事——让品牌方相信"你能把我的配方从概念做到货架"，然后填写询盘表。

它的站点由**三套并行的页面体系**叠加而成，各自承接不同搜索意图与转化阶段；全站五语（EN/FR/DE/ES/JA）镜像。

---

## A1. 内容本质：信任 → 询盘的转化漏斗（四层）

| 层 | 对应版块 | 作用 |
|---|---|---|
| 能力展示 | 首页 4 大剂型（Gummy/Capsule/Liquid/Tablet） | 让买家一眼知道"你能做什么剂型" |
| 信任支撑 | Why Choose Us、全球工厂布局（HK/US/深圳/加拿大）、认证、数据条、AI 研发、客户案例 | 解决"凭什么信你" |
| 转化辅助 | 现成配方目录、FAQ、博客、SOQ 询盘 | 降低决策门槛、SEO 引流 |
| 收口 | Contact 页 6 段式配方需求表单 | 把泛流量变成可报价的线索 |

**两个最值钱的可复用资产**：
- ① 剂型详情页的统一模板；
- ② 分段式询盘表单（不是留邮箱，而是收集配方状态、剂型、数量、是否有现成配方）。

---

## A2. 页面架构：三套并行体系（sitemap 实测）

Sitemap 索引实测：`post 79 篇 / page 37 / product 127 / product_cat 8 / custom-formulation 1000 / addl 1`。

| 体系 | URL 规律 | 页面数 | 作用 | 转化位置 |
|---|---|---|---|---|
| ① 核心页面 | 根路径 + `/{page}/` | 37 | 品牌信任 + 服务能力，人工精写 | 每屏 CTA → 询盘 |
| ② 白牌目录 | `/private-label/{剂型}/{产品}/` | 127 | 具体产品落地页，接长尾词 | 产品页内 Get a quote |
| ③ 定制配方库 | `/custom-formulation/{维度}/{值}/` | 1000 | 程序化批量生成，抢覆盖面 | 分类页 CTA |
| ④ 博客 | `/{文章slug}/` | 79 | 内容营销 + SEO 引流 | 文末 CTA |

---

## A3. 页面层级树

```
核心页面（37，人工精写）
/                                    首页
/about-us/                           关于我们
/about-us/certifications/            资质认证
/efficacy/                           功效说明（独立信息页）
/contact-us/                         询盘（6 段式配方需求表单）
/privacy-policy/                     隐私政策
/tablet-manufacturing/               ┐
/capsule-manufacturing/              ├ 4 个剂型制造能力页（★ 核心层）
/liquid-manufacturing/               │
/gummy-manufacturing/                ┘
/custom-formulation/                 定制配方总览
/custom-formulation/categories/{8}/  成分类别（8 个）
/custom-formulation/effects/{15}/    功效方向（15 个）

白牌目录（127 产品页）
/private-label/{gummy|capsule|drops|tablet|softgel|powder|stick-pack}/
  └ /{具体产品slug}/   例：/private-label/capsule/ashwagandha-capsules/

定制配方库（1000，程序化）
/custom-formulation/{成分维度 8}/{值}/  ×  /custom-formulation/{功效维度 15}/{值}/

博客（79）
/{文章slug}/   例：/pectin-vs-gelatin-gummies/

多语言：以上页面均有 EN / FR / DE / ES / JA 五个镜像版本
```

**8 个成分类别**：vitamins-minerals、proteins-peptides-amino-acids、botanical-extracts-functional-compounds、probiotics-prebiotics-postbiotics、specialty-functional-ingredients、functional-lipids、functional-animal-derived-ingredients 等。

**15 个功效方向**：weight-management、beauty-skin-health、joint-health、gut-health、eye-health、liver-health、immune-support、brain-support、cardiovascular-support、mood-stress-support、sports-performance、men's-health、women's-health、children's-growth、food-herb-wellness。

---

## A4. 单页通用骨架（几乎全站复用）

```
Hero（定位句 + 双 CTA）
→ 数据条（MOQ / 交期 / 工厂数）
→ 服务能力
→ Why us
→ 流程
→ 规格表
→ 质量标准三段（AI 研发 / 制药级 / 全球可追溯）
→ 认证
→ 客户案例
→ FAQ
→ 相关链接
→ 底部 CTA
```

---

## A5. 剂型详情页标准模板（4 个页面套同一套）

```
1. Hero         剂型名 + 一句话能力 + [Get a quote] [View products]
2. Why us       为什么选我们做这个剂型（2-3 个技术卖点）
3. 定制能力      壳材/规格/外形/包衣等技术选项（体现专业度）
4. 5 步流程      配方兼容性 → 混合 → 成型 → 干燥/抛光 → QC 检测出 COA
5. 规格表        Shell/Materials ｜ Formats ｜ MOQ ｜ 成熟配方（按功能分）
6. 质量标准      AI 研发 / 制药级 / 可追溯（全站复用三段）
7. 工厂图集 + 认证
8. 成熟配方清单   按功能分组
9. FAQ           该剂型专属 6 问
10. 其他剂型互链 + CTA
```

---

## A6. 询盘表单字段（6 段式，最值钱的转化资产）

- **基本信息**：姓名 / WhatsApp / 邮箱 / 国家 / 公司
- **配方状态**：自有完整配方 / 需优化 / 有参考产品 / 只有想法
- **规格文档**：当前状态、可提供的文件类型（完整配方 / 成分表 / 规格单 / 营养标签）
- **优化细节**：想优化什么（成分增删 / 剂量 / 口味 / 质地 / 甜度 / 色泽 / 规格 / 剂型）、改动幅度
- **参考产品**：来源（本站 / 竞品站 / 电商 / 实物 / 展会）、名称、URL、期望动作
- **附加要求**：剂型（Capsule/Softgel/Gummy/Liquid/Tablet/Powder）、目标数量区间、文件上传

---

## A7. 内链逻辑

- 首页 → 4 剂型页 + 关于 + 询盘
- 剂型页 → 白牌目录对应剂型 + 其他 3 剂型互链
- 产品页 → 询盘 + 同剂型其他产品
- 配方库页 → 询盘 + 交叉维度
- 全站所有页面 → 询盘页（唯一转化终点）
