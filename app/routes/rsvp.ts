import { redirect } from "react-router";

export function loader() {
	return redirect(
		"https://docs.google.com/forms/d/e/1FAIpQLSf0T6eoi3Y9feuyTKw_KxQ0sPdFvHe8nUmkPFt6dOeI9qUIkw/viewform",
	);
}
