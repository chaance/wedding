import * as React from "react";
import { type LinkProps, Link } from "react-router";
import cx from "clsx";
import styles from "./button.module.css";

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
			className={cx(className, styles.buttonImpl, {
				[styles.primary]: variant === "primary",
				[styles.secondary]: variant === "secondary",
				[styles.md]: size === "md",
				[styles.lg]: size === "lg",
				[styles.glassy]: glassy,
			})}
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
	function Button({ type = "button", className, ...props }, forwardedRef) {
		return (
			<ButtonImpl
				{...props}
				className={cx(styles.button, className)}
				ref={forwardedRef}
				type={type}
				as="button"
			/>
		);
	},
);

export interface ButtonLinkProps extends ButtonCommonProps, LinkProps {}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
	function ButtonLink({ className, ...props }, forwardedRef) {
		return (
			<ButtonImpl
				{...props}
				className={cx(styles.buttonLink, className)}
				ref={forwardedRef}
				as={Link}
			/>
		);
	},
);

export interface ButtonAnchorProps
	extends ButtonCommonProps,
		React.ComponentPropsWithRef<"a"> {}

export const ButtonAnchor = React.forwardRef<
	HTMLAnchorElement,
	ButtonAnchorProps
>(function ButtonAnchor({ className, ...props }, forwardedRef) {
	return (
		<ButtonImpl
			{...props}
			className={cx(styles.buttonLink, className)}
			ref={forwardedRef}
			as="a"
		/>
	);
});

export type ButtonSize = "md" | "lg";
export type ButtonVariant = "primary" | "secondary";
