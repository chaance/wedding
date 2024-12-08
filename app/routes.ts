import * as Router from "@react-router/dev/routes";

export default [
	Router.layout("routes/layout.tsx", [
		// primary layout routes
		Router.index("routes/home.tsx"),
		Router.route("accommodations", "routes/accommodations.tsx"),
		Router.route("travel", "routes/travel.tsx"),
		Router.route("venue", "routes/venue.tsx"),
	]),
	Router.route("rsvp", "routes/rsvp.ts"),
] satisfies Router.RouteConfig;
