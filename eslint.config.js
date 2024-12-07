import * as js from "@chance/eslint";
import * as react from "@chance/eslint/react";
import * as typescript from "@chance/eslint/typescript";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type {import("eslint").Linter.Config[]} */
export default [
	js.config,
	typescript.config,
	react.config,
	{
		plugins: { "react-refresh": reactRefresh },
		rules: {
			"react-refresh/only-export-components": [
				"warn",
				{
					allowExportNames: [
						// https://reactrouter.com/start/framework/route-module
						"loader",
						"clientLoader",
						"action",
						"clientAction",
						"ErrorBoundary",
						"HydrateFallback",
						"headers",
						"handle",
						"links",
						"meta",
						"shouldRevalidate",
					],
					allowConstantExport: true,
				},
			],
		},
	},
];
