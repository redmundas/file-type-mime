import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ["esm", "cjs"],
  target: false,
});
