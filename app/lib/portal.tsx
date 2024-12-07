import * as React from "react";
import { createPortal } from "react-dom";
import { useLayoutEffect } from "@chance/hooks/use-layout-effect";
import { useIsHydrated } from "@chance/hooks/use-is-hydrated";

const PortalImpl: React.FC<PortalProps> = ({
	children,
	type = "chance-portal",
	containerRef,
	unstable_mountRef: mountRefProp,
}) => {
	let mountRef = React.useRef<HTMLDivElement | null>(null);
	let [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);

	useLayoutEffect(() => {
		let mountNode = (mountRefProp ?? mountRef).current;
		if (!mountNode) {
			return;
		}
		let document = mountNode.ownerDocument;
		let body = containerRef?.current || document.body;
		let portalNode = document.createElement(type);
		body.appendChild(portalNode);
		setPortalNode(portalNode);
		return () => {
			body.removeChild(portalNode);
		};
	}, [type, containerRef, mountRefProp]);

	let mountElement = mountRefProp ? null : <span ref={mountRef} />;
	return portalNode ? createPortal(children, portalNode) : mountElement;
};

export const Portal: React.FC<PortalProps> = ({ ssr = false, ...props }) => {
	let isHydrated = useIsHydrated();
	if (isHydrated || ssr) {
		return <PortalImpl {...props} />;
	}
	return null;
};

export interface PortalProps {
	children: React.ReactNode;
	/** The DOM element type to render */
	type?: string;
	/**
	 * The container ref to which the portal will be appended. If not set the
	 * portal will be appended to the body of the component's owner document
	 * (typically this is the `document.body`).
	 */
	containerRef?: React.RefObject<Node>;
	ssr?: boolean;
	/**
	 * Optional ref used to mount the portal. If not set, a new span element will
	 * be mounted where the Portal is rendered on the initial render. This may
	 * cause issues with styles in some cases, so passing a ref for a node that is
	 * mounted elsewhere in the DOM can help avoid this.
	 */
	unstable_mountRef?: React.RefObject<HTMLElement>;
}
