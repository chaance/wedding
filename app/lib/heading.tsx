import cx from "clsx";
import * as React from "react";
import styles from "./heading.module.css";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends React.ComponentPropsWithRef<"h2"> {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
	level?: HeadingLevel;
}

const HeadingLavelContext = React.createContext<HeadingProps | null>(null);
HeadingLavelContext.displayName = "HeadingLevelContext";

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
	function Heading({ children, as, ...props }, forwardedRef) {
		const levelContext = React.useContext(HeadingLavelContext);
		const level = props.level ?? levelContext?.level ?? 2;
		const Component = as ?? `h${level}`;
		return (
			<Component
				{...props}
				ref={forwardedRef}
				data-level={level}
				className={cx(styles.heading, props.className)}
			>
				{children}
			</Component>
		);
	},
);
