import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			provider: "v8",
			all: true,
			include: ["src/**/*.ts"],
			reportsDirectory: "./coverage/",
			reportOnFailure: true,
		},
		passWithNoTests: true,
	},
});
