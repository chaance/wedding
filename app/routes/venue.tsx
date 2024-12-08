import type { ImageSource } from "~/lib/hero";
import { Hero } from "~/lib/hero";
import { Heading } from "~/lib/heading";
import type { Route } from "./+types/venue";
import { getMeta } from "~/lib/meta";
import { useLoaderData } from "react-router";

export async function loader(args: Route.LoaderArgs) {
	const url = new URL(args.request.url);
	const rootUrl = `${url.protocol}//${url.host}`;
	// prettier-ignore
	let sources = [
		{ src: "16x9/800w",  media: "(max-width: 740px)" },
		{ src: "16x9/1500w" },
	].reduce<ImageSource[]>((acc, { src, media }) => {
		return [
			...acc,
			{
				src: `/images/venue-${src}.avif`,
				media,
				type: "image/avif"
			},
			{
				src: `/images/venue-${src}.jpg`,
				media,
				type: "image/jpeg"
			},
		];
	}, []);
	return { rootUrl, sources };
}

export const meta: Route.MetaFunction = () => {
	return [...getMeta({ title: "Venue" })];
};

export default function Accommodations() {
	let { sources } = useLoaderData<typeof loader>();
	return (
		<main className="rte-Accommodations">
			<Hero gutters imgSources={sources} imgPosition="bottom" size="half">
				<div className="rte-Accommodations__heroContent">
					<Heading as="h1" level={1} className="rte-Accommodations__heroTitle">
						Wedding Venue
					</Heading>
				</div>
			</Hero>
			<div className="container prose">
				<h2>General information</h2>
				<p>
					Our wedding and reception will be at the intimate{" "}
					<a
						href="https://juliettechapel.com/"
						target="_blank"
						rel="noreferrer"
					>
						Juliette Chapel
					</a>{" "}
					in Dahlonega, Georgia.
				</p>
				<p>
					Parking at the venue is very limited.{" "}
					<strong>We ask that guests please carpool if possible.</strong>
				</p>

				<p>
					The wedding ceremony will be inside the chapel, with an outdoor
					reception to follow. Previous May weather data indicates that we
					should expect moderate temperatures and sun.{" "}
					<strong>We recommend dressing for an early summer evening.</strong>
				</p>

				<p>
					In the event of inclement weather we will move the reception inside.
				</p>

				<h2>Reception food</h2>

				<p>
					No wedding is complete without unsalted chicken or overcooked fish.
					Unfortunately we will offer neither.
				</p>

				<p>
					We have secured a food truck operated by genuine taco artists grilling
					up some tasty tortilla-wrapped eats. They will glady accommodate
					vegetarians, vegans, and omnivorous alike.
				</p>
			</div>
		</main>
	);
}
