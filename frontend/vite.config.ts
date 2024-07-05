import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        svgo: true,
      },
    }),
  ],
  resolve: {
    alias: {
      assets: "/src/assets",
      components: "/src/components",
      pages: "/src/pages",
      services: "/src/services",
      store: "/src/store",
      theme: "/src/theme",
      types: "/src/types",
      ui: "/src/ui",
      utils: "/src/utils",
      hooks: "/src/hooks",
    },
  },
});
