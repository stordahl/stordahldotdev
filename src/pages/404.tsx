import { _flexColumn } from "../components/css";

export function NotFound() {
	const imageUrl = "https://i.giphy.com/fzFiKLW1BFsaY.webp";
	const imageAlt = "a gif of Sailor Moon crying";

	return (
		<div class={_flexColumn}>
			<h1>404</h1>
			<p>Page Not Found</p>
			<img src={imageUrl} alt={imageAlt} />
		</div>
	);
}

export const NotFoundMeta = { title: "Page Not Found" };
