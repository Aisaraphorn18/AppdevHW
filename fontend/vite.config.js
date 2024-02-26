import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { terser } from "rollup-plugin-terser";
// import { visualizer } from "rollup-plugin-visualizer";
import { visualizer } from 'rollup-plugin-visualizer';
import deadFile from 'vite-plugin-deadfile';
import million from "million/compiler";

export default defineConfig({
  plugins: [
    react(),
    visualizer() ,
    deadFile({
      root: 'src',
    }),
    million.vite({ auto: true }),
  ],
  // css: {
  //   postcss: {
  //     plugins: [require('tailwindcss'), require('autoprefixer')],
  //   },
  // },
  optimizeDeps: {
    include: ["million"],
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // ปิดการโชว์ console.log ใน production mode
      },
    },
    rollupOptions: {
      plugins: [terser()],
    },
  },
  server: {
    // คอนฟิก server ตามที่คุณต้องการ
    host: true,
    strictPort: true,
    port: 8088,
  },
  preview: {
    port: 8083,
  },
});


