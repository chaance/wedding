import * as React from "react";
import {
	DismissButton,
	FocusScope,
	Overlay,
	useButton,
	useOverlayTrigger,
	usePopover,
} from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState, OverlayTriggerProps } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import { ButtonAnchor } from "./button";
import cx from "clsx";

interface CalendarLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	label: string;
	href: string;
}

interface CalendarPopperProps extends OverlayTriggerProps {
	calendarLinks: CalendarLink[];
	trigger: (args: {
		props: React.ComponentPropsWithoutRef<"button">;
		ref: React.RefObject<HTMLButtonElement>;
	}) => React.ReactElement;
}

export function CalendarPopper({
	calendarLinks,
	trigger,
	...props
}: CalendarPopperProps) {
	let triggerRef = React.useRef(null);
	let state = useOverlayTriggerState(props);
	let { triggerProps, overlayProps } = useOverlayTrigger(
		{ type: "menu" },
		state,
		triggerRef,
	);
	let { buttonProps: rsvpButtonProps } = useButton(triggerProps, triggerRef);
	return (
		<>
			{trigger({
				props: {
					...rsvpButtonProps,
					className: cx(
						rsvpButtonProps.className,
						"comp-CalendarPopper__trigger",
					),
				},
				ref: triggerRef,
			})}
			{state.isOpen && (
				<Popover placement="top" triggerRef={triggerRef} state={state}>
					<div {...overlayProps} className="comp-CalendarPopper__popper">
						<h2 className="comp-CalendarPopper__heading">
							Add to your calendar
						</h2>
						<div className="comp-CalendarPopper__buttons">
							{calendarLinks.map(({ label, ...props }) => (
								<ButtonAnchor
									key={label}
									target="_blank"
									rel="noreferrer"
									{...props}
								>
									{label}
								</ButtonAnchor>
							))}
						</div>
					</div>
				</Popover>
			)}
		</>
	);
}

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	children: React.ReactNode;
	state: OverlayTriggerState;
}

function Popover({ children, state, offset = 8, ...props }: PopoverProps) {
	let popoverRef = React.useRef(null);
	let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
		{
			...props,
			offset,
			popoverRef,
		},
		state,
	);

	const Wrapper = state.isOpen ? FocusScope : React.Fragment;

	return (
		<Overlay>
			<div {...underlayProps} className="comp-CalendarPopper__overlay" />
			<Wrapper contain restoreFocus autoFocus>
				<div
					tabIndex={-1}
					{...popoverProps}
					ref={popoverRef}
					data-popover=""
					data-state={state.isOpen ? "open" : "closed"}
					data-placement={placement}
					className="comp-CalendarPopper__popover"
				>
					<svg
						{...arrowProps}
						className="comp-CalendarPopper__popoverArrow"
						data-placement={placement}
						viewBox="0 0 12 12"
						stroke="1"
					>
						<path d="M0 0 L6 6 L12 0" />
					</svg>
					<DismissButton onDismiss={state.close} />
					{children}
					<DismissButton onDismiss={state.close} />
				</div>
			</Wrapper>
		</Overlay>
	);
}
