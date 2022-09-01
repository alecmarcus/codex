import { defineConfig } from "astro/config";
import { SITE_URL } from "../constants";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  server: { port: 2022 },
});
