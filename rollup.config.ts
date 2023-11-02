import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";
import dts from "rollup-plugin-dts";

const config: RollupOptions[] = [
  {
    input: "src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [typescript()],
  },
  {
    // path to your declaration files root
    input: "./dist/dts/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
export default config;
