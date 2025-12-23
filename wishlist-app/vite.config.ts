import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubPages = process.env.GITHUB_REPOSITORY?.includes('wishlist-app');

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? '/wishlist-app/' : '/',
});
