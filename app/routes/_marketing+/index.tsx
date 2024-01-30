import { type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Epic Notes" }];

export default function Index() {
	return (
		<main className="">
			<div className="bg-black bg-opacity-10">
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
		</main>
	);
}
