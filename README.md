# JINHAO ZHENG — 赛博流体风格个人作品集

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2-black?logo=next.js" alt="Next.js 14">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3.4">
  <img src="https://img.shields.io/badge/Three.js-r165-000000?logo=three.js" alt="Three.js">
  <img src="https://img.shields.io/badge/Framer_Motion-11-E91E63" alt="Framer Motion 11">
</p>

一个暗色、赛博朋克、流体质感的**个人作品集单页**。整站只有一个页面，但包含 3D WebGL 流体 blob、自定义双层光标、字符级标题入场、滚动视差、双向 marquee、滚动生长时间线等一整套视觉语言。

- 框架：**Next.js 14 App Router + TypeScript**
- 样式：**Tailwind CSS**（自定义 `void / neon / magenta / violet / acid` 色板）+ 手写 CSS 特效
- 3D：**Three.js** + 自定义 GLSL 顶点/片元 shader（Ashima simplex noise）
- 动效：**Framer Motion**（spring、滚动映射、`whileInView`）
- 部署：Vercel 零配置

---

## 目录

- [1. 设计概念](#1-设计概念)
- [2. 技术栈](#2-技术栈)
- [3. 页面结构](#3-页面结构)
- [4. 快速开始](#4-快速开始)
- [5. 项目结构](#5-项目结构)
- [6. 设计系统](#6-设计系统)
- [7. 核心交互实现](#7-核心交互实现)
- [8. 内容维护指南](#8-内容维护指南)
- [9. 响应式与可访问性](#9-响应式与可访问性)
- [10. 性能说明](#10-性能说明)
- [11. 部署](#11-部署)
- [12. 已知限制](#12-已知限制)
- [13. 许可](#13-许可)

---

## 1. 设计概念

> "Human in the loop, agents in the stack."

整站的视觉母题是**流体**：一个由噪声驱动的 3D 半透明 blob 占据首屏，随鼠标与滚动缓慢变形；页面向下滚动时，首屏标题上移淡出、blob 放大，像"溶解"进下一节。配合胶片噪点、描边大字、霓虹渐变、glitch hover，营造一种"暗色实验场"的氛围。

内容层面它是一份简历/作品集：个人简介、技能栈、两段实习经历、6 个精选项目、联系方式。所有内容硬编码在组件里，改文案不需要数据库或 CMS。

## 2. 技术栈

| 层 | 技术 | 版本（`package.json`） |
| --- | --- | --- |
| 框架 | Next.js（App Router） | `^14.2.30` |
| UI | React / React DOM | `^18.3.1` |
| 语言 | TypeScript | `^5` |
| 样式 | Tailwind CSS / PostCSS / Autoprefixer | `^3.4.4` / `^8.4.38` / `^10.4.19` |
| 3D | Three.js | `^0.165.0` |
| 动效 | Framer Motion | `^11.18.2` |
| 字体 | Space Grotesk（显示）、Space Mono（等宽），Google Fonts CDN | — |

## 3. 页面结构

`app/page.tsx` 按顺序组合 9 个组件，形成单页滚动叙事：

```text
Cursor（全局自定义光标，fixed）
Nav（全局滚动进度条 + 右上角导航，fixed）
├─ Hero          #top        3D 流体 blob + JINHAO / ZHENG 大字 + 状态条
├─ Marquee                   技术关键词横向滚动条
├─ About         #about      "Human in the loop, agents in the stack."
├─ ── h-line ──
├─ Skills        #skills     4 组技能标签，交错进出场
├─ Marquee reverse           反向滚动条
├─ Experience    #experience 滚动生长的时间线（2 段实习）
├─ ── h-line ──
├─ Projects      #projects   6 个项目，hover/点击展开详情
└─ Contact       #contact    渐变大字 + 邮箱 CTA + 页脚
```

导航链接只指向 `#about`、`#skills`、`#projects`、`#contact` 四个锚点。

## 4. 快速开始

### 环境要求

- Node.js 18.17+（Next.js 14 要求），本项目在 Node 24 下开发
- npm（或 pnpm / yarn，命令自行替换）

### 本地运行

```bash
npm install
npm run dev        # http://localhost:3000
```

### 生产构建

```bash
npm run build
npm run start      # 默认 http://localhost:3000
```

`package.json` 只有三个脚本：`dev`、`build`、`start`，没有配置 lint / test 脚本。

## 5. 项目结构

```text
new-personal-website/
├─ app/
│  ├─ layout.tsx         # 根布局：metadata、Google Fonts、body.grain
│  ├─ page.tsx           # 单页组件编排
│  └─ globals.css        # Tailwind 指令 + 全部手写 CSS 特效
├─ components/
│  ├─ Cursor.tsx         # 双层自定义光标（点 + spring 跟随圈）
│  ├─ Nav.tsx            # 顶部滚动进度条 + 锚点导航
│  ├─ Hero.tsx           # 首屏：动态加载 FluidScene + 字符级标题 + 滚动视差
│  ├─ FluidScene.tsx     # Three.js 流体 blob（GLSL 噪声位移 + 菲涅尔着色）
│  ├─ Marquee.tsx        # 无缝滚动关键词条（可反向）
│  ├─ About.tsx          # 简介 + 教育背景卡片
│  ├─ Skills.tsx         # 技能分组标签
│  ├─ Experience.tsx     # 时间线（滚动驱动的进度线）
│  ├─ Projects.tsx       # 项目列表（手风琴展开）
│  ├─ Reveal.tsx         # 通用滚动入场包装组件（4 个方向）
│  └─ Contact.tsx        # 联系方式 + 页脚
├─ next.config.mjs       # 仅开启 reactStrictMode
├─ tailwind.config.ts    # 色板与字体扩展
├─ postcss.config.mjs
├─ tsconfig.json         # 路径别名 @/* → 根目录
└─ package.json
```

## 6. 设计系统

### 色板（`tailwind.config.ts`）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `void` | `#050208` | 页面底色 |
| `ink` | `#0b0613` | 卡片/条带背景 |
| `neon` | `#7df9ff` | 主强调色（青） |
| `magenta` | `#ff2d92` | 次级强调色（品红） |
| `violet` | `#8b5cf6` | 渐变中段 / 粒子 |
| `acid` | `#c8ff00` | 少量高亮（"shipped" 等） |

### 字体

- 显示字体：`Space Grotesk`（300–700），用于大标题；
- 等宽字体：`Space Mono`（400/700 + italic），用于正文、标签、导航；
- 通过 `<head>` 里的 Google Fonts `<link>` 加载，CSS 变量 `--font-display` / `--font-mono` 注入 Tailwind。

### 手写 CSS 特效（`app/globals.css`）

| 类名 | 效果 |
| --- | --- |
| `.grain` | 全屏 SVG `feTurbulence` 胶片噪点，0.6s 步进抖动，`opacity: 0.05` |
| `.text-stroke` / `.text-stroke-neon` | `-webkit-text-stroke` 描边大字（ZHENG、SOMETHING 等） |
| `.gradient-text` | 青→紫→品红 110° 渐变文字 |
| `.glitch` | hover 时 `skewX` 抖动 |
| `.animate-marquee` / `-reverse` | 28s / 32s 无限横向滚动 |
| `.pulse-glow` | "open to work" 状态点的呼吸发光 |
| `.h-line` | 透明→青→品红→透明的渐变分隔线 |
| 自定义滚动条 | 6px，青→品红渐变 |
| `* { cursor: none }` | 隐藏系统光标（触屏设备通过 `@media (hover: none)` 恢复） |

## 7. 核心交互实现

### 7.1 3D 流体 blob（`FluidScene.tsx`）

整站最重的组件，约 260 行，全部在客户端运行（`"use client"`，并由 Hero 以 `ssr: false` 动态加载）。

- **几何**：`THREE.IcosahedronGeometry(2, 96)`，高细分球体；
- **顶点着色器**：三层 Ashima simplex noise（频率 1.2 / 3.5 / 7.0，振幅 1.0 / 0.35 / 0.12）沿法线方向位移顶点，鼠标位置作为 `warp` 扭噪声场，滚动进度额外放大位移；
- **片元着色器**：基于视线与法线的菲涅尔项混合青/紫/品红/深底色，并在边缘叠加高光；
- **场景装饰**：两个旋转的 torus 线框环 + 700 个球壳分布粒子；
- **交互缓动**：鼠标与滚动目标值以指数缓动追随（每帧 0.04 / 0.06），产生"流体滞后"感；相机随鼠标轻微位移并始终看向原点；
- **资源清理**：effect 返回时取消 `requestAnimationFrame`、移除事件监听、`dispose()` 几何/材质/renderer 并移除 canvas。

性能相关：`setPixelRatio(Math.min(devicePixelRatio, 2))` 限制像素比；滚动监听设为 `passive`；容器带 `aria-hidden`，canvas 不进入可访问性树。

### 7.2 首屏与滚动视差（`Hero.tsx`）

- 标题 `JINHAO` / `ZHENG` 逐字母入场（延迟 0.5s 起，每个字母 +0.06s，`rotate ±8°` 回正）；
- 标题第二行使用 `.text-stroke` 描边效果；
- 基于 `useScroll` 的非线性映射：标题上移 260px、底部社交条下移 180px、整块透明度在 70% 滚动处归零、blob 容器放大到 1.25 倍——形成"溶解"过渡。

### 7.3 自定义光标（`Cursor.tsx`）

- 内层 8px 实心点：直接用 `useMotionValue` 跟随鼠标；
- 外层圆环：`useSpring`（stiffness 150 / damping 18）产生拖尾；
- 通过 `e.target.closest("a, button, [data-hover]")` 判断是否悬停在可交互元素上，悬停时圆环从 32px 放大到 56px；
- `mix-blend-difference` 保证在深浅背景上都可见；
- 仅在 `md` 断点以上显示（移动端隐藏）。

### 7.4 滚动入场（`Reveal.tsx`）

统一包装组件，支持 `up / left / right / skew` 四个方向，`whileInView` 触发一次，视口 margin 为 `-80px`，动画曲线统一为 `[0.16, 1, 0.3, 1]`（快进慢出）。

### 7.5 其他细节

- **导航进度条**：`useScroll` + `useSpring` 映射到顶部 2px 渐变条的 `scaleX`；
- **时间线**：`Experience` 用滚动进度控制渐变进度线高度（0% → 100%）；
- **项目列表**：hover 或点击展开描述，`AnimatePresence` 做高度动画，标题右移 18px 并染上项目强调色，底部 accent 线从 0% 长到 100%；
- **Marquee**：列表复制一份实现无缝循环，正反两条分别 28s / 32s；
- **联系区**：三团 `blur` 渐变色斑 + 13vw 巨型标题 + 弹簧 hover 的邮箱按钮。

## 8. 内容维护指南

所有内容都是硬编码，改文案只需编辑对应组件：

| 想改什么 | 文件 | 位置 |
| --- | --- | --- |
| 姓名/首屏文案/状态/社交链接 | `components/Hero.tsx` | `letters`、`letters2`、`<p>`、底部链接 |
| 个人简介/教育卡片 | `components/About.tsx` | 三段 `<p>` 与 `[big, small]` 数组 |
| 技能分组 | `components/Skills.tsx` | `groups` 数组（tag/color/items） |
| 实习经历 | `components/Experience.tsx` | `items` 数组（period/role/org/desc） |
| 项目清单 | `components/Projects.tsx` | `projects` 数组（no/title/stack/desc/accent） |
| 邮箱/电话/页脚 | `components/Contact.tsx` | CTA 链接、底部信息、footer |
| 滚动关键词 | `components/Marquee.tsx` | `items` 数组 |
| 导航锚点 | `components/Nav.tsx` | `links` 数组 |
| 色板/字体 | `tailwind.config.ts` | `theme.extend.colors/fontFamily` |
| 全局 CSS 特效 | `app/globals.css` | 各类名与 keyframes |
| SEO 标题/描述 | `app/layout.tsx` | `metadata` |

## 9. 响应式与可访问性

- **断点**：主要用 `md`（768px）切换字号、内边距、导航位置与光标显隐；首屏用 `100svh` 适配移动端浏览器工具栏；
- **触屏适配**：`@media (hover: none)` 恢复系统光标，自定义光标在 `md` 以下隐藏；
- **语义**：每个区块使用 `<section id="...">`，标题层级 h1→h2→h3；
- **装饰元素**：首屏 blob 容器 `aria-hidden`，页脚年份动态生成；
- **动效**：使用 `whileInView` + `once`，滚动监听 `passive`；
- **不足**：未实现 `prefers-reduced-motion` 降级；自定义光标对键盘用户无影响但也无额外焦点样式；项目展开依赖 hover/点击，键盘可达性一般。

## 10. 性能说明

- Three.js 场景通过 `next/dynamic(..., { ssr: false })` 懒加载，不阻塞首屏 HTML；
- 像素比上限 2，避免 4K/高 DPI 屏幕上过度绘制；
- 所有动画走 `transform` / `opacity`，不触发布局；
- 高细分几何体 + 每帧 3 次 simplex 噪声计算对集成显卡有一定压力，这是本站最大的性能开销；
- 未做图片资源（无大图），除 Google Fonts 外无第三方请求。

## 11. 部署

**Vercel（推荐，零配置）**：把仓库推到 GitHub，在 Vercel 导入并直接 Deploy 即可，Next.js 会被自动识别。

**其他平台**：

```bash
npm run build
npm run start     # Node 服务器模式
```

如果部署到纯静态托管，需要给 `next.config.mjs` 增加 `output: "export"` 后把 `out/` 上传（当前配置未开启）。

## 12. 已知限制

- 单页静态内容，没有 CMS/后台，所有文案改动都需要改代码并重新部署；
- 项目卡片只有描述，没有外链或详情页；
- `FluidScene` 未对低性能设备做降级（如降低 detail、减少粒子），也没有 `prefers-reduced-motion` 支持；
- 没有 ESLint / Prettier / 测试配置，也没有 CI；
- 联系方式（邮箱、电话）直接写在组件里，属于公开信息，介意的话应改为表单或隐藏；
- 自定义光标与 glitch 动效在部分环境可能影响可读性；
- 依赖 CDN 加载 Google Fonts，离线或受限网络下会回退到系统字体。

## 13. 许可

仓库未附带 LICENSE 文件。站点代码可作学习参考；个人简介、项目描述、联系方式等文案与个人资料版权归作者所有，请勿直接复制用作他人的作品集。
