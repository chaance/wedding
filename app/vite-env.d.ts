/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SITE_URL: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
