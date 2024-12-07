import * as React from "react";
import styles from "./nav-dialog.module.css";
import cx from "clsx";
import { RemoveScroll } from "react-remove-scroll";
import { useComposedRefs } from "@chance/hooks/use-composed-refs";
import { Portal } from "./portal";

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
	let { close, open, toggle } = React.useMemo(() => {
		let close = () => dialogRef.current?.close();
		let open = () => dialogRef.current?.showModal();
		let toggle = () => {
			if (!dialogRef.current) return;
			if (dialogRef.current.open) {
				dialogRef.current.close();
			} else {
				dialogRef.current.showModal();
			}
		};
		return { close, open, toggle };
	}, []);

	let [isOpen, setIsOpen] = React.useState(false);
	React.useEffect(() => {
		if (!dialogElement) return;
		let observer = new MutationObserver((mutations) => {
			let mutation = mutations.find(
				(m) => m.type === "attributes" && m.attributeName === "open",
			);
			if (!mutation) return;
			let isOpen = (mutation.target as HTMLDialogElement).open;
			setIsOpen(isOpen);
		});
		observer.observe(dialogElement, { attributes: true });
	}, [dialogElement]);

	return (
		<NavDialogContext.Provider
			value={{ isOpen, close, open, toggle, setDialogElement, dialogRef }}
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
		className: cx(child.props.className, styles.trigger),
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
				<dialog ref={ref} className={cx(styles.dialog, className)} {...props}>
					{children}
					<button
						type="button"
						onClick={close}
						className={styles.closeButton}
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
