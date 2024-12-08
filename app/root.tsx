import {
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheetUrl from "./index.css?url";
import { SiteHeader } from "./lib/site-header";
import { SiteFooter } from "./lib/site-footer";

export const links: Route.LinksFunction = (): Route.LinkDescriptors => [
	{
		rel: "stylesheet",
		href: stylesheetUrl,
	},
	{
		rel: "preload",
		as: "font",
		href: "/fonts/charlevoix-light.woff",
		type: "font/woff",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		as: "font",
		href: "/fonts/charlevoix-regular.woff",
		type: "font/woff",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		as: "font",
		href: "/fonts/editorial-new-variable.woff2",
		type: "font/woff2",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		as: "font",
		href: "/fonts/editorial-new-italic-variable.woff2",
		type: "font/woff2",
		crossOrigin: "anonymous",
	},
	{
		rel: "preload",
		as: "font",
		href: "/fonts/mori-variable.woff2",
		type: "font/woff2",
		crossOrigin: "anonymous",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<SVGSprites />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404: Not Found" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<div className="rte-Root-ErrorBoundary">
			<SiteHeader className="rte-Root-ErrorBoundary__header" />
			<main className="rte-Root-ErrorBoundary__main container prose">
				<h1>{message}</h1>
				<p>{details}</p>
				<Link to="/">Go home</Link>
				{stack && (
					<pre>
						<code>{stack}</code>
					</pre>
				)}
			</main>
			<SiteFooter />
		</div>
	);
}

function SVGSprites() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			className="sr-only"
		>
			<symbol id="icon-amp" viewBox="0 0 50 50">
				<path
					d="M8 48C19.9044 43.8101 24.3339 37.3743 25.8842 30.3911C22.9497 33.352 19.656 36 16.5 36C13.3993 36 10 33.4134 10 29C10 21.1229 20.354 16.0168 26.5 13C26.5 6 30.5906 0 34.6326 0C36.8473 0 38 1.43296 38 3.5C38 7.57821 33.0386 10.2626 28 13V14.4134V16.5H41L40.5 17L34 17C33.5 20 30.9228 24.8603 27.047 29.162C25.1091 37.2067 19 46 8 50V48ZM14 29.5C13.8339 32.4609 14.8423 35 17.5 35C20.4346 35 23.5034 32.2905 26.1057 29.3855C26.9362 24.9162 26.5 21.5 26.5 17C26.5 12.5 26.5 13.5 26.5 13.5C23.1225 15.3994 14.3876 21.7346 14 29.5ZM27.3238 27.933C30.5352 23.9106 32.8607 19.4581 32.9715 17L28 17C27.9446 20.4637 28.1544 24.0223 27.3238 27.933ZM28 12.5C31.0453 10.9358 36 7.74581 36 3.5C36 1.43296 35.3523 0.558659 33.8574 0.558659C29.5386 0.558659 28.1661 6.80168 28 12.5Z"
					fillRule="evenodd"
				/>
			</symbol>
			<symbol id="icon-close" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</symbol>
			<svg id="icon-hamburger" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
				/>
			</svg>
		</svg>
	);
}
