# 簡語彤

以 [Nuxt 3](https://nuxt.com/) 為框架、[Tailwind CSS](https://tailwindcss.com/) 為樣式，並使用 **Node.js 22** 的專案。

## 環境需求

- Node.js `>= 22`（專案根目錄含 `.nvmrc`，可使用 `nvm use`）

## 安裝

```bash
npm install
```

## 開發

```bash
npm run dev
```

瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。

## 建置與預覽

```bash
npm run build
npm run preview
```

靜態站（GitHub Pages）預覽：

```bash
nvm use
NUXT_APP_BASE_URL=/why-am-i-abroad/ npm run generate
npx serve .output/public
```

## 部署到 GitHub Pages

遠端儲存庫：[tzuling2001/why-am-i-abroad](https://github.com/tzuling2001/why-am-i-abroad)

1. 將變更推送到 `master`（含 `.github/workflows/deploy.yml`）。
2. 在 GitHub 儲存庫：**Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。
3. 推送後於 **Actions** 分頁確認 workflow 成功；網站網址為  
   **https://tzuling2001.github.io/why-am-i-abroad/**

若影片放在 `public/videos/`，請一併提交；`Video` 元件會依 `baseURL` 解析路徑。

## 技術棧

- **Nuxt 3** — Vue 全端框架
- **@nuxtjs/tailwindcss** — Tailwind CSS 模組整合
- **TypeScript** — 型別支援（`nuxt.config.ts` 等）
