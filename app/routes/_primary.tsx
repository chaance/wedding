import { Outlet } from "react-router";
import { SiteFooter } from "~/lib/site-footer";
import { SiteHeader } from "~/lib/site-header";
import stylesheetUrl from "./_primary.css?url";
import type { Route } from "./+types/_primary";

export const links: Route.LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheetUrl },
];

export default function PrimaryLayout() {
	return (
		<div className="rte-PrimaryLayout">
			<SiteHeader className="rte-PrimaryLayout__header" />
			<div className="rte-PrimaryLayout__main">
				<Outlet />
			</div>
			<SiteFooter />
		</div>
	);
}
