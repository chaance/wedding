import * as React from "react";
import * as CalendarLink from "calendar-link";
import { useLoaderData } from "react-router";
import { useIsHydrated } from "@chance/hooks";
import { Hero, type ImageSource } from "~/lib/hero";
import { Button, ButtonLink } from "~/lib/button";
import { CalendarPopper } from "~/lib/calendar-popper";
import styles from "./_primary._index.module.css";
import type { Route } from "./+types/_primary._index";

export async function loader(_args: Route.LoaderArgs) {
	const wedding: CalendarLink.CalendarEvent = {
		title: "Chance and Morgan's Wedding",
		duration: [6, "hour"],
		location: "Juliette Chapel and Events, Dahlonega, GA",
		// May 10, 2025, 12:00 PM EST
		start: new Date("2025-05-10T12:00:00-05:00"),
	};

	return {
		google: CalendarLink.google(wedding),
		ics: CalendarLink.ics(wedding),
		outlook: CalendarLink.outlook(wedding),
	};
}

export const meta = (_args: Route.MetaArgs): Route.MetaDescriptors => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

// prettier-ignore
let sources = [
	{ src: "1x1/600w",   media: "(max-width: 740px) and (orientation: portrait) and (max-resolution: 1.5dppx)" },
	{ src: "1x1/1000w",  media: "(max-width: 740px) and (orientation: portrait)" },
	{ src: "16x9/600w",  media: "(max-width: 740px) and (max-resolution: 1.5dppx)" },
	{ src: "16x9/1000w", media: "(max-width: 740px)" },
	{ src: "16x9/1000w", media: "(max-width: 1024px) and (max-resolution: 1.5dppx)" },
	{ src: "16x9/1600w", media: "(max-width: 1024px)" },
	{ src: "16x9/2000w" },
].reduce<ImageSource[]>((acc, { src, media }) => {
	return [
		...acc,
		{
			src: `/images/home-header-${src}.avif`,
			media,
			type: "image/avif"
		},
		{
			src: `/images/home-header-${src}.jpg`,
			media,
			type: "image/jpeg"
		},
	];
}, []);

export default function Index() {
	let { google, ics, outlook } = useLoaderData<typeof loader>();
	let rsvpButtonRef = React.useRef(null);
	let isHydrated = useIsHydrated();

	return (
		<main className={styles.main}>
			<Hero gutters imgSources={sources}>
				<div className={styles.heroContent}>
					<h1 className={styles.heroTitle}>
						Chance<em className="sr-only"> & </em>
						<svg aria-hidden>
							<use href="#icon-amp" />
						</svg>
						Morgan
					</h1>
					<p className={styles.heroContentBody}>
						After eight good years, we're doing the damn thing! Join us for a
						celebration of love and friendship as we start this new chapter.
					</p>

					<div className={styles.heroContentDetails}>
						<dl className={styles.heroContentList}>
							{[
								{ title: "Date", desc: "May 10, 2025" },
								{
									title: "Location",
									desc: (
										<a
											href="https://juliettechapel.com/"
											target="_blank"
											rel="noreferrer"
										>
											Dahlonega, GA
										</a>
									),
								},
							].map(({ title, desc }) => {
								return (
									<div key={title} className={styles.heroContentItem}>
										<dt className="sr-only">{title}</dt>
										<dd className={styles.heroContentDesc}>{desc}</dd>
									</div>
								);
							})}
						</dl>
					</div>
					<div className={styles.heroButtons}>
						<ButtonLink
							to="/rsvp"
							ref={rsvpButtonRef}
							className={styles.heroButton}
							size="lg"
							glassy
						>
							RSVP
						</ButtonLink>
						{isHydrated ? (
							<CalendarPopper
								trigger={({ props, ref }) => (
									<Button
										ref={ref}
										type="button"
										className={styles.heroButton}
										size="lg"
										glassy
										{...props}
									>
										Add to Calendar
									</Button>
								)}
								calendarLinks={[
									{ label: "Google", href: google },
									{ label: "Outlook", href: outlook },
									{
										label: "iCal",
										href: ics,
										download: "chance-morgan-wedding",
									},
								]}
							/>
						) : (
							<ButtonLink
								to={ics}
								className={styles.heroButton}
								size="lg"
								glassy
								download="chance-morgan-wedding"
							>
								Add to Calendar
							</ButtonLink>
						)}
					</div>
				</div>
			</Hero>
		</main>
	);
}
