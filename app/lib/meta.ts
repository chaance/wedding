import type { MetaDescriptor } from "react-router";

const DEFAULT_TITLE = "Chance + Morgan";
const DEFAULT_DESCRIPTION =
	"After eight good years, we’re doing the damn thing! Join us for a celebration of love and friendship as we start this new chapter.";

export const getMeta = ({
	title = DEFAULT_TITLE,
	description = DEFAULT_DESCRIPTION,
}: {
	title?: string;
	description?: string;
} = {}): MetaDescriptor[] => {
	let rootUrl = import.meta.env.VITE_SITE_URL;
	if (!rootUrl) {
		throw new Error("Missing VITE_SITE_URL in import.meta.env");
	}
	title = title === DEFAULT_TITLE ? title : `${title} | ${DEFAULT_TITLE}`;
	return [
		{ title },
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: "website" },
		{
			property: "og:image",
			content: `${rootUrl}/images/og.jpg`,
		},
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "theme-color", content: "#46A758" },
		{ name: "robots", content: "noindex, nofollow" },
	];
};
