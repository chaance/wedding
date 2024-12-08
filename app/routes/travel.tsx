import type { ImageSource } from "~/lib/hero";
import { Hero } from "~/lib/hero";
import { Heading } from "~/lib/heading";
import type { Route } from "./+types/travel";
import { getMeta } from "~/lib/meta";
import { useLoaderData } from "react-router";

export async function loader(args: Route.LoaderArgs) {
	const url = new URL(args.request.url);
	const rootUrl = `${url.protocol}//${url.host}`;
	// prettier-ignore
	let sources = [
		{ src: "16x9/800w",  media: "(max-width: 740px)" },
		{ src: "16x9/1600w", media: "(max-width: 1024px)" },
		{ src: "16x9/2000w" },
	].reduce<ImageSource[]>((acc, { src, media }) => {
		return [
			...acc,
			{
				src: `/images/travel-${src}.avif`,
				media,
				type: "image/avif"
			},
			{
				src: `/images/travel-${src}.jpg`,
				media,
				type: "image/jpeg"
			},
		];
	}, []);

	// prettier-ignore
	let suggestions = [
		{ name: "Lily Creek Lodge", address: "2608 Auraria Road, Dahlonega, GA 30533", src: "https://www.lilycreeklodge.com/" },
		{ name: "Dahlonega Inn on Main", address: "168 W Main Street, Dahlonega, GA 30533", src: "https://www.dahlonegainn.com/" },
		{ name: "The Smith House", address: "84 South Chestatee Street, Dahlonega, GA 30533", src: "https://smithhouse.com/" },
	];
	return { rootUrl, sources, suggestions };
}

export const meta: Route.MetaFunction = () => {
	return [...getMeta({ title: "Travel" })];
};

export default function Accommodations() {
	let { sources, suggestions } = useLoaderData<typeof loader>();
	return (
		<main className="rte-Accommodations">
			<Hero gutters imgSources={sources} size="half">
				<div className="rte-Accommodations__heroContent">
					<Heading as="h1" level={1} className="rte-Accommodations__heroTitle">
						Travel Information
					</Heading>
				</div>
			</Hero>
			<div className="container prose">
				<h2>Staying near the venue</h2>
				<p>
					There are a number of inns, Bed and Breakfasts, and small hotels in
					Dahlonega. It's a great little mountain town with a beautiful historic
					downtown. We recommend booking close to town so you can visit a unique
					piece of Georgia and enjoy wedding shenanigans late into Saturday
					evening.
				</p>

				<p>
					The{" "}
					<a href="https://members.dlcchamber.org/list/ql/lodging-travel-15">
						Dahlonega Chamber of Commerce
					</a>{" "}
					provides a list of all lodging in the city. Below are a few that are
					closest to the venue:
				</p>

				{suggestions.map(({ address, name, src }) => (
					<dl key={name}>
						<dt>
							<a href={src} target="_blank" rel="noreferrer">
								{name}
							</a>
						</dt>
						<dd>{address}</dd>
					</dl>
				))}

				<p>
					If you prefer to stay at a major hotel chain, please look into staying
					in Cummings, GA. It’s about 20 minutes away and a much larger city
					than Dahlonega.
				</p>
			</div>
		</main>
	);
}
