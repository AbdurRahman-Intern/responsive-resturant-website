import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration. The React plugin enables JSX and fast refresh.
// TODO: If you deploy under a sub-path (e.g. example.com/saffron/), set base: "/saffron/".
export default defineConfig({
  plugins: [react()],
});
