import * as React from "react";
import { Link, type LinkProps } from "@remix-run/react";
import cx from "clsx";

const commonClassNames =
	"inline-flex items-center justify-center whitespace-nowrap bg-primary hover:bg-primary/90 rounded-sm font-bold uppercase transition hover:brightness-110 select-none";

const sizeMdClassNames = "px-8 mt-5 h-12 text-base";
const variantPrimaryClassNames =
	"bg-gradient-to-tr from-lime-700 to-lime-800 text-white";

type ButtonSharedProps = {
	variant?: "primary";
	size?: "md";
	disabled?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button(
		{ children, variant = "primary", size = "md", disabled, ...props },
		forwardedRef,
	) {
		return (
			<button
				ref={forwardedRef}
				{...props}
				disabled={disabled || undefined}
				className={cx(commonClassNames, {
					[sizeMdClassNames]: size === "md",
					[variantPrimaryClassNames]: variant === "primary",
				})}
			>
				{children}
			</button>
		);
	},
);

export type ButtonProps = Omit<
	React.ComponentPropsWithRef<"button">,
	keyof ButtonSharedProps | "className" | "style"
> &
	ButtonSharedProps;

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	function ButtonLink(
		{ children, variant = "primary", size = "md", disabled, ...props },
		forwardedRef,
	) {
		return (
			<Link
				ref={forwardedRef}
				{...props}
				aria-disabled={disabled || undefined}
				className={cx(commonClassNames, {
					[sizeMdClassNames]: size === "md",
					[variantPrimaryClassNames]: variant === "primary",
				})}
			>
				{children}
			</Link>
		);
	},
);

export type ButtonLinkProps = Omit<
	LinkProps,
	keyof ButtonSharedProps | "className" | "style"
> &
	ButtonSharedProps;
