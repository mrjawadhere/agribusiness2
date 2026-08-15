if (!process.env.NITRO_PRESET) {
  process.env.NITRO_PRESET = "vercel";
}

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
