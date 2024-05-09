import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@c": path.resolve(__dirname, "src/client"),
            "@s": path.resolve(__dirname, "src/server"),
            "@t": path.resolve(__dirname, "src/types"),
        }
    }
});
