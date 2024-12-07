import * as path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import postcssCustomMedia from "postcss-custom-media";
import postcssGlobalData from "@csstools/postcss-global-data";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	css: {
		postcss: {
			plugins: [
				autoprefixer(),
				postcssGlobalData({
					files: [path.resolve(import.meta.dirname, "app/media.css")],
				}),
				postcssCustomMedia(),
			],
		},
	},
	plugins: [reactRouter(), tsconfigPaths()],
});
