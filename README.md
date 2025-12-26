# ✨ Wishlist App

A modern **Wishlist Application** built with **React + Vite**, powered by a **fake REST API** using `json-server`.  
Users can **create, edit, delete, search, and sort** wishlist items with a simple and friendly UI.

---

## 📁 Project Structure

wishlist-app/
├── db.json # database for json-server
├── package.json # dependencies and scripts
├── vite.config.js # Vite configuration
├── src/ # frontend source code
└── ...

---

## Local Setup

### 1️⃣ Clone the repository

git clone <YOUR_REPOSITORY_URL>
cd wishlist-app

### 2️⃣ Install dependencies

Install dependencies

### 3️⃣ Run the backend (json-server)

npm run server

- The fake API will be available at: http://localhost:3001/wishes

- db.json is used as the database.

### 4️⃣ Run the frontend (React + Vite)

npm run dev

🌍 Open in your browser: http://localhost:5173/

- The frontend automatically connects to the backend at http://localhost:3001/wishes.

🧰 Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the frontend in development mode (Vite) |
| `npm run build`   | Build the production version of the frontend  |
| `npm run preview` | Preview the production build locally          |
| `npm run server`  | Start the fake REST API using json-server     |
| `npm run lint`    | Run ESLint to check code style and errors     |


🛠️ Technologies

⚛️ React 19

⚡ Vite

🎨 Tailwind CSS

🧾 TypeScript

🧾 json-server (fake REST API)

🧩 clsx (for conditional class names)



🌐 Deployment
Complete instructions to deploy both frontend and backend


Frontend on GitHub Pages

1️⃣ Make sure vite.config.js contains the correct base for GitHub Pages:

const isGitHubPages = process.env.GITHUB_REPOSITORY?.includes('wishlist-app');

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/wishlist-app/' : '/',
});


2️⃣ Commit and push to the main branch.
3️⃣ GitHub Actions workflow (.github/workflows/deploy.yml) example:

name: Deploy Wishlist App to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
        working-directory: ./wishlist-app
      - run: npm run build
        working-directory: ./wishlist-app
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./wishlist-app/dist
      - id: deploy
        uses: actions/deploy-pages@v4

4️⃣ Your app will be deployed at https://<USERNAME>.github.io/wishlist-app/.


🗄️ Backend on Render https://render.com

1. Go to Render and create a new Web Service.

2. Connect your repository with the backend (db.json + package.json).

3. Set the Start Command to:

npx json-server --watch db.json --port 10000

4. Set the Environment to Node 20 (or latest stable).

5. Render will provide a URL, e.g. https://wishlist-backend.onrender.com/wishes.

6. Update src/useApi.ts to point to the deployed backend:

const base = 'https://wishlist-backend.onrender.com/wishes';


📝 Notes

✔ Frontend GitHub Pages base path does not affect local development
✔ json-server supports full CRUD
✔ Render free tier may sleep — first request may be slow


❤️ Enjoy!

If you like the project — ⭐ Star it & contribute!
