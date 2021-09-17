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
    ],
  },
  plugins: [reactRefresh()],
});
