import * as React from "react";
import { NavLink } from "react-router";
import * as NavDialog from "~/lib/nav-dialog";
import cx from "clsx";

let links = [
	{ to: "/rsvp", text: "RSVP" },
	{ to: "/venue", text: "Venue" },
	{ to: "/travel", text: "Travel Info" },
	{ to: "/accommodations", text: "Accommodations" },
];

export function SiteHeader({ className }: { className?: string }) {
	return (
		<header className={cx("comp-SiteHeader", className)}>
			<NavLink to="/" className="comp-SiteHeader__mark">
				<div className="sr-only">Homepage</div>
				<div aria-hidden className="comp-SiteHeader__markText">
					<span>C</span>
					<svg>
						<use href="#icon-amp" />
					</svg>
					<span>M</span>
				</div>
			</NavLink>

			<nav aria-label="primary" className="comp-SiteHeader__desktopNav">
				<NavList>
					{links.map((link) => (
						<NavItem key={link.text} to={link.to}>
							{link.text}
						</NavItem>
					))}
				</NavList>
			</nav>

			<NavigationDialog />
		</header>
	);
}

function NavigationDialog() {
	return (
		<NavDialog.Root>
			<NavDialog.Trigger>
				<button
					type="button"
					className="comp-SiteHeader__navTrigger"
					title="Toggle navigation"
				>
					<span className="sr-only">Open navigation</span>
					<svg
						aria-hidden
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<use href="#icon-hamburger" />
					</svg>
				</button>
			</NavDialog.Trigger>
			<NavDialog.Content
				aria-label="site navigation"
				className="comp-SiteHeader__navDialog"
			>
				<nav aria-label="primary" className="comp-SiteHeader__mobileNav">
					<NavList>
						<NavItem to="/">Home</NavItem>
						{links.map((link) => (
							<NavItem key={link.text} to={link.to}>
								{link.text}
							</NavItem>
						))}
					</NavList>
				</nav>
			</NavDialog.Content>
		</NavDialog.Root>
	);
}

function isUrl(url: string) {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

function NavList({ children }: { children: React.ReactNode }) {
	return <ul className="comp-SiteHeader__navList">{children}</ul>;
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<li className="comp-SiteHeader__navItem">
			{isUrl(to) ? (
				<a
					className="comp-SiteHeader__navLink"
					href={to}
					rel="noreferrer"
					target="_blank"
				>
					{children}
				</a>
			) : (
				<NavLink className="comp-SiteHeader__navLink" to={to}>
					{children}
				</NavLink>
			)}
		</li>
	);
}
