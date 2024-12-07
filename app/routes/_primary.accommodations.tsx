import type { ImageSource } from "~/lib/hero";
import { Hero } from "~/lib/hero";
import styles from "./_primary.accommodations.module.css";
import { Heading } from "~/lib/heading";

// prettier-ignore
let sources = [
	{ src: "16x9/800w",  media: "(max-width: 740px)" },
	{ src: "16x9/1600w", media: "(max-width: 1024px)" },
	{ src: "16x9/2000w" },
].reduce<ImageSource[]>((acc, { src, media }) => {
	return [
		...acc,
		{
			src: `/images/accommodations-${src}.avif`,
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

export default function Accommodations() {
	return (
		<main className={styles.main}>
			<Hero gutters imgSources={sources} size="half">
				<div className={styles.heroContent}>
					<Heading as="h1" level={1} className={styles.heroTitle}>
						Accommodations
					</Heading>
				</div>
			</Hero>
			<div>
				<p>
					There are a number of inns, Bed and Breakfasts, and small hotels in
					Dahlonega.
				</p>

				<p>
					Below is the link to the Dahlonega Chamber of Commerce. They provide a
					list of all lodging in the city!
				</p>

				<p>
					If you are wanting to stay at a major hotel chain, please look into
					staying in Cummings GA! It’s about 20 min away and much larger city
					than Dahlonega.
				</p>
			</div>
		</main>
	);
}
