import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), "");
  const rootEnv = loadEnv(mode, path.resolve(__dirname, ".."), "");
  const env = { ...localEnv, ...rootEnv };

  const SERVER_PORT = parseInt(env.SERVER_PORT || process.env.SERVER_PORT || "33001");
  const FRONT_PORT = parseInt(env.FRONT_PORT || process.env.FRONT_PORT || "33002");
  const IS_DEV = (env.IS_DEV ?? process.env.IS_DEV) === "true";

  return {
    base: '/',
    envDir: path.resolve(__dirname, ".."),
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@server": path.resolve(__dirname, "../back/src"),
      },
    },
    server: {
      host: true,
      port: FRONT_PORT,
      strictPort: true,
      proxy: {
        "/api": {
          target: `http://127.0.0.1:${SERVER_PORT}`,
          changeOrigin: true,
        },
      },
    },
    define: {
      __IS_DEV__: JSON.stringify(IS_DEV),
    },
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        input: {
          app: path.resolve(__dirname, 'app.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/@tanstack/react-router') || id.includes('node_modules/@tanstack/react-query')) {
              return 'vendor-tanstack';
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
          },
          assetFileNames: (assetInfo) => {
            if (/\.(css)$/.test(assetInfo.names?.[0] ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.names?.[0] ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(assetInfo.names?.[0] ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    }
  };
});
