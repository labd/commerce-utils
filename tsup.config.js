import { defineConfig } from "tsup";

export default defineConfig([
	{
		entry: ["src/*.ts"],
		clean: true,
		splitting: false,
		dts: true,
		sourcemap: false,
		format: ["esm"],
		outDir: "dist",
	},
]);
