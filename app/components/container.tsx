import * as React from "react";
import cx from "clsx";

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	function Container({ children, size = "lg", ...props }, forwardedRef) {
		return (
			<div
				ref={forwardedRef}
				{...props}
				style={{
					// @ts-expect-error
					"--gap": "2rem",
					"--gap-md": "4rem",
				}}
				className={cx(
					"w-[calc(100%-var(--gap))] md:w-[calc(100%-var(--gap-md))]",
					{
						"max-w-screen-md": size === "md",
						"max-w-screen-lg": size === "lg",
					},
				)}
			>
				{children}
			</div>
		);
	},
);

type ContainerProps = Omit<
	React.ComponentPropsWithRef<"div">,
	"className" | "style"
> & {
	size?: "md" | "lg";
};

export type { ContainerProps };
export { Container };
