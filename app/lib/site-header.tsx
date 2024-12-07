import * as React from "react";
import { NavLink } from "react-router";
import * as NavDialog from "~/lib/nav-dialog";
import styles from "./site-header.module.css";
import cx from "clsx";

let links = [
	{ to: "/rsvp", text: "RSVP" },
	{ to: "/travel", text: "Travel Info" },
	{ to: "/accommodations", text: "Accommodations" },
];

export function SiteHeader({ className }: { className?: string }) {
	return (
		<header className={cx(styles.header, className)}>
			<NavLink to="/" className={styles.mark}>
				<div className="sr-only">Homepage</div>
				<div aria-hidden className={styles.markText}>
					<span>C</span>
					<svg aria-hidden>
						<use href="#icon-amp" />
					</svg>
					<span>M</span>
				</div>
			</NavLink>

			<nav aria-label="primary" className={styles.desktopNav}>
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
					className={styles.navTrigger}
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
			<NavDialog.Content aria-label="site navigation">
				<nav aria-label="primary" className={styles.mobileNav}>
					<NavList>
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
	return <ul className={styles.navList}>{children}</ul>;
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<li className={styles.navItem}>
			{isUrl(to) ? (
				<a
					className={styles.navLink}
					href={to}
					rel="noreferrer"
					target="_blank"
				>
					{children}
				</a>
			) : (
				<NavLink className={styles.navLink} to={to}>
					{children}
				</NavLink>
			)}
		</li>
	);
}
