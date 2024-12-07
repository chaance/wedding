import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("routes/_primary.tsx", [
		// primary layout routes
		index("routes/_primary._index.tsx"),
		route("accommodations", "routes/_primary.accommodations.tsx"),
		route("qa", "routes/_primary.qa.tsx"),
		route("travel", "routes/_primary.travel.tsx"),
	]),
	route("rsvp", "routes/rsvp.ts"),
] satisfies RouteConfig;
