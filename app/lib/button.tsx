import * as React from "react";
import { type LinkProps, Link } from "react-router";
import cx from "clsx";

interface ButtonCommonProps {
	variant?: ButtonVariant;
	glassy?: boolean;
	size?: ButtonSize;
}

interface ButtonImplProps extends ButtonCommonProps {
	as?: any;
	className?: string;
	type?: any;
}

const ButtonImpl = React.forwardRef<any, ButtonImplProps>(function ButtonImpl(
	{
		as: Component,
		className,
		variant = "primary",
		glassy = false,
		size = "md",
		...props
	},
	forwardedRef,
) {
	return (
		<Component
			{...props}
			className={cx(className, "comp-Button")}
			data-variant={variant}
			data-size={size}
			data-glassy={glassy || undefined}
			ref={forwardedRef}
		/>
	);
});

export interface ButtonProps
	extends ButtonCommonProps,
		React.ComponentPropsWithRef<"button"> {
	type?: "button" | "submit" | "reset";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	function Button({ type = "button", ...props }, forwardedRef) {
		return <ButtonImpl {...props} ref={forwardedRef} type={type} as="button" />;
	},
);

export interface ButtonLinkProps extends ButtonCommonProps, LinkProps {}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	function ButtonLink(props, forwardedRef) {
		return <ButtonImpl {...props} ref={forwardedRef} as={Link} />;
	},
);

export interface ButtonAnchorProps
	extends ButtonCommonProps,
		React.ComponentPropsWithRef<"a"> {}

export const ButtonAnchor = React.forwardRef<
	HTMLAnchorElement,
	ButtonAnchorProps
>(function ButtonAnchor(props, forwardedRef) {
	return <ButtonImpl {...props} ref={forwardedRef} as="a" />;
});

export type ButtonSize = "md" | "lg";
export type ButtonVariant = "primary" | "secondary";
