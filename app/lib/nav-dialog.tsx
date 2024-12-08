import * as React from "react";
import cx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { useComposedRefs } from "@chance/hooks/use-composed-refs";
import { Portal } from "./portal";
import { useEffectEvent } from "@chance/hooks";
import { useNavigation } from "react-router";

function getStore(dialogElement: HTMLDialogElement | null) {
	type State = { isOpen: boolean };
	let state = { isOpen: false };
	let listeners = new Set<() => void>();

	function subscribe(callback: () => void): () => void {
		listeners.add(callback);
		if (!dialogElement) {
			return () => {
				listeners.delete(callback);
			};
		}

		let update = (isOpen: boolean) => {
			if (state.isOpen !== isOpen) {
				state = { isOpen };
				callback();
			}
		};

		let observer = new MutationObserver((mutations) => {
			let mutation = mutations.find(
				(m) => m.type === "attributes" && m.attributeName === "open",
			);
			if (!mutation) {
				return;
			}
			let isOpen = (mutation.target as HTMLDialogElement).open;
			update(isOpen);
		});
		observer.observe(dialogElement, { attributes: true });
		let onClose = () => update(false);
		dialogElement.addEventListener("close", onClose);
		return () => {
			observer.disconnect();
			dialogElement.removeEventListener("close", onClose);
			listeners.delete(callback);
		};
	}

	function getSnapshot(): State {
		return state;
	}

	function getServerSnapshot() {
		return state;
	}

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}

	function toggle() {
		setIsOpen((prev) => !prev);
	}

	function setIsOpen(action: boolean | ((prev: boolean) => boolean)) {
		let isOpen = typeof action === "function" ? action(state.isOpen) : action;
		if (state.isOpen !== isOpen) {
			state = { isOpen: isOpen };
			if (dialogElement) {
				if (isOpen) {
					dialogElement.showModal();
				} else {
					dialogElement.close();
				}
			}
			emitChange();
		}
	}

	function emitChange() {
		for (let listener of listeners) {
			listener();
		}
	}

	return {
		subscribe,
		open,
		close,
		toggle,
		getSnapshot,
		getServerSnapshot,
		setIsOpen,
	};
}

const NavDialogContext = React.createContext<{
	setDialogElement: React.Dispatch<
		React.SetStateAction<HTMLDialogElement | null>
	>;
	dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
	open: () => void;
	close: () => void;
	toggle: () => void;
	isOpen: boolean;
} | null>(null);
NavDialogContext.displayName = "NavDialogContext";

function useNavDialogContext() {
	let context = React.useContext(NavDialogContext);
	if (context === null) {
		throw new Error(
			"useNavDialogContext must be used within a NavDialogProvider",
		);
	}
	return context;
}

function NavDialogRoot(props: { children: React.ReactNode }) {
	let dialogRef = React.useRef<HTMLDialogElement | null>(null);
	let [dialogElement, setDialogElement] =
		React.useState<HTMLDialogElement | null>(null);

	let {
		close,
		getServerSnapshot,
		getSnapshot,
		open,
		setIsOpen,
		subscribe,
		toggle,
	} = React.useMemo(() => getStore(dialogElement), [dialogElement]);
	let { isOpen } = React.useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot,
	);

	let navigation = useNavigation();
	let navState = React.useRef(navigation.state);
	React.useEffect(() => {
		let previousNavState = navState.current;
		navState.current = navigation.state;
		if (
			previousNavState !== navigation.state &&
			// close once navigation is complete
			navigation.state === "idle"
		) {
			close();
		}
	}, [navigation, close]);

	useMatchMediaChange("(min-width: 768px)", (matches) => {
		if (matches) {
			setIsOpen(false);
		}
	});

	return (
		<NavDialogContext.Provider
			value={{
				isOpen,
				close,
				open,
				toggle,
				setDialogElement,
				dialogRef,
			}}
		>
			{props.children}
		</NavDialogContext.Provider>
	);
}

interface NavDialogTriggerProps {
	children: React.ReactElement;
}

function NavDialogTrigger(props: NavDialogTriggerProps) {
	let state = useNavDialogContext();
	let child = React.Children.only(props.children);
	return React.cloneElement(child, {
		type: child.type === "button" ? "button" : undefined,
		onClick: state.open,
		className: cx(child.props.className, "comp-NavDialog__trigger"),
	});
}

interface NavDialogContentProps extends React.ComponentPropsWithRef<"dialog"> {}

const NavDialogContent = React.forwardRef<
	HTMLDialogElement,
	NavDialogContentProps
>(function NavDialogContent({ children, className, ...props }, forwardedRef) {
	let { close, dialogRef, setDialogElement, isOpen } = useNavDialogContext();
	let ref = useComposedRefs(
		forwardedRef,
		dialogRef,
		setDialogElement as React.RefCallback<HTMLDialogElement>,
	);

	return (
		<Portal>
			<RemoveScroll enabled={isOpen}>
				<dialog
					ref={ref}
					className={cx("comp-NavDialog", className)}
					{...props}
				>
					{children}
					<button
						type="button"
						onClick={close}
						className="comp-NavDialog__closeButton"
						title="Close navigation"
					>
						<span className="sr-only">Close navigation</span>
						<svg
							area-hidden="true"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<use href="#icon-close" />
						</svg>
					</button>
				</dialog>
			</RemoveScroll>
		</Portal>
	);
});

export {
	NavDialogRoot as Root,
	NavDialogTrigger as Trigger,
	NavDialogContent as Content,
};

function useMatchMediaChange(
	rawQuery: string,
	callback: (matches: boolean) => void,
) {
	let savedCallback = useEffectEvent(callback);
	React.useEffect(() => {
		let listener = (event: MediaQueryListEvent) => savedCallback(event.matches);
		let mq = window.matchMedia(rawQuery);
		mq.addEventListener("change", listener);
		return () => {
			mq.removeEventListener("change", listener);
		};
	}, [savedCallback, rawQuery]);
}
