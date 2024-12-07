import { Outlet } from "react-router";
import { SiteFooter } from "~/lib/site-footer";
import { SiteHeader } from "~/lib/site-header";
import styles from "./_primary.module.css";

export default function PrimaryLayout() {
	return (
		<div className={styles.layout}>
			<SiteHeader className={styles.header} />
			<div className={styles.main}>
				<Outlet />
			</div>
			<SiteFooter />
		</div>
	);
}
