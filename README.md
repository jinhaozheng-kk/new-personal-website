# Jinhao Zheng — Portfolio

暗色赛博流体风格个人网站。Next.js 14 + TypeScript + Tailwind + Three.js（自定义 GLSL 流体 shader）+ Framer Motion。

## 运行

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 生产构建
```

## 部署到 Vercel

推送到 GitHub 后在 Vercel 导入仓库即可，零配置。

## 亮点

- **3D 流体 blob**（`components/FluidScene.tsx`）：icosphere + 三层 simplex 噪声顶点位移，菲涅尔虹彩着色，跟随鼠标与滚动非线性缓动变形
- **非线性动画**：自定义贝塞尔曲线 `[0.16,1,0.3,1]`、spring 物理、滚动视差（各层不同速率）、字符级标题入场
- **前卫细节**：自定义双层光标、胶片噪点、glitch hover、描边大字、双向 marquee、滚动生长时间线

## 自定义内容

文案在各 `components/*.tsx` 内，颜色在 `tailwind.config.ts`。
