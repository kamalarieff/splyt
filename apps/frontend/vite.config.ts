import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: "utils", replacement: path.resolve(__dirname, "/src/utils") },
      { find: "apis", replacement: path.resolve(__dirname, "/src/apis") },
      {
        find: "components",
        replacement: path.resolve(__dirname, "/src/components"),
      },
      {
        find: "containers",
        replacement: path.resolve(__dirname, "/src/containers"),
      },
      { find: "hooks", replacement: path.resolve(__dirname, "/src/hooks") },
      { find: "configs", replacement: path.resolve(__dirname, "/src/configs") },
      { find: "icons", replacement: path.resolve(__dirname, "/src/icons") },
    ],
  },
  plugins: [reactRefresh()],
});
