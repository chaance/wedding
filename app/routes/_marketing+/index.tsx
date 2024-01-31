import { json } from "@remix-run/node";
import { Container } from "#app/components/container";
import { type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ButtonLink } from "#app/components/button";

export async function loader() {
	const date = "2025-05-10";
	const time = "14:00:00";
	const timeZone = "America/New_York";
	const globalDateTime = `${date}T${time}-04:00`;
	const weddingDate = new Date(globalDateTime);
	const dateFormatted = weddingDate.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
		timeZone,
	});
	const timeFormatted = weddingDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		timeZone,
	});

	return json({ dateFormatted, timeFormatted, globalDateTime });
}

export const meta: MetaFunction = () => [{ title: "Epic Notes" }];

export default function Index() {
	const { dateFormatted, timeFormatted, globalDateTime } =
		useLoaderData<typeof loader>();
	return (
		<main className="">
			<div className="flex flex-col relative items-center">
				<div className="bg-black bg-opacity-10 w-full">
					<div className="max-w-[2000px] mx-auto aspect-[2/1] overflow-hidden">
						<img
							src="https://picsum.photos/2000/1000"
							srcSet="https://picsum.photos/480/240 480w, https://picsum.photos/760/380 760w, https://picsum.photos/2000/1000 2000w"
							sizes="(max-width: 480px) 480px, (min-width: 481px) and (max-width: 760px) 760px, 2000px"
							alt="Chance and Morgan"
							loading="eager"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
				<Container>
					<div className="py-4 md:py-8">
						<h1 className="max-w-xl text-4xl font-bold sm:text-5xl lg:text-6xl">
							Chance + Morgan
						</h1>
						<p className="max-w-sm pt-5 text-xl lg:max-w-full">
							Join us for a celebration of love and life.
						</p>
						<hr className="relative z-0 my-5 max-w-[200px] sm:max-w-lg lg:max-w-xl" />

						<dl className="grid max-w-sm grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:flex lg:max-w-lg lg:gap-14">
							{[
								{
									title: "Wedding Day",
									contents: (
										<time dateTime={globalDateTime}>{dateFormatted}</time>
									),
								},
								{
									title: "Time",
									contents: timeFormatted,
								},
								{
									title: "Location",
									contents: (
										<a
											href="https://maps.app.goo.gl/NQdjAxSEhX6T8q35A"
											target="_blank"
											rel="noreferrer"
										>
											<p>Dahlonega, GA</p>
										</a>
									),
								},
							].map((meta) => {
								return (
									<div key={meta.title}>
										<dt className="text-sm uppercase tracking-wide">
											{meta.title}
										</dt>
										<dd className="text-lg">{meta.contents}</dd>
									</div>
								);
							})}
						</dl>

						<ButtonLink to="/rsvp">
							RSVP{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
								className="-mr-2 ml-2 w-4"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</ButtonLink>
					</div>
				</Container>
			</div>
		</main>
	);
}
