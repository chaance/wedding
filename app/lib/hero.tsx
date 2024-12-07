import * as React from "react";
import cx from "clsx";
import styles from "./hero.module.css";

type ImageSourceType = "image/avif" | "image/jpeg";

export interface ImageSource {
	src: string;
	media?: string;
	type: ImageSourceType;
}

export function Hero({
	children,
	className,
	imgSources,
	gutters = false,
	size = "full",
}: {
	children: React.ReactNode;
	className?: string;
	imgSources: ImageSource[];
	gutters?: boolean;
	size?: "full" | "half";
}) {
	let fallback = imgSources.at(-1);
	if (!fallback) {
		throw new Error("No image sources provided");
	}
	return (
		<div
			className={cx(
				styles.hero,
				gutters && styles.withGutters,
				styles[`${size}Size`],
				className,
			)}
		>
			<picture className={styles.image}>
				{imgSources.map(({ src, media, type }) => (
					<React.Fragment key={src + media}>
						<source srcSet={src} media={media} type={type} />
					</React.Fragment>
				))}
				<img className={styles.imageInner} src={fallback.src} alt="" />
			</picture>
			<div className={styles.inner}>{children}</div>
		</div>
	);
}
