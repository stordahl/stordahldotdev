import { Style, css } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Scripts from "./components/Scripts";
import { _globalCss } from "./globalCSS";

export const renderer = jsxRenderer(
	({
		children,
		cssFile,
		description,
		title,
		loadMermaid = false,
	}: PropsWithChildren<CustomRendererProps>) => {
		return (
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width" />
					<meta name="description" content={description} />
					<link href="/static/favicon-dark.png" rel="icon" />
					<link href="/static/css/tokens.css" rel="stylesheet" preload />
					<link href="/static/css/mailto.css" rel="stylesheet" preload />
					<Style />
					{cssFile && (
						<link href={`/static/css/${cssFile}.css`} rel="stylesheet" />
					)}
					{loadMermaid && (
						<link href="/static/css/mermaid.css" rel="stylesheet" preload />
					)}
					<title>{title} | Jacob Stordahl</title>
				</head>
				<body class={_globalCss}>
					<Header />
					<main class={_main}>{children}</main>
					<Footer />
					<Scripts loadMermaid={loadMermaid} />
				</body>
			</html>
		);
	},
	{
		docType: true,
	},
);

type CustomRendererProps = {
	cssFile: string;
	description: string;
	title: string;
	loadMermaid: boolean;
};

const _main = css`	
  padding: 1rem;
  margin: auto;
  width: clamp(380px, calc(85vw + 5px), 750px);
`;
