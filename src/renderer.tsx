import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(
	({ children, title }) => {
		return (
			<html lang="en">
				<head>
					<link href="/static/style.css" rel="stylesheet" />
					<link rel="stylesheet" href="/static/highlight.css" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossorigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
						rel="stylesheet"
					/>
					<title>{title}</title>
				</head>
				<body>
					<header>
						<span>jacob stordahl</span>
						<nav class="print-hide">
							<a href="/">home</a>
							<a href="/writing">writing</a>
							<a href="/talks">talks</a>
							<a href="/systems">systems</a>
						</nav>
					</header>
					<main>{children}</main>
					<footer>
						<div id="copyright">
							<span>© {new Date().getFullYear()} Jacob Stordahl</span>
						</div>
					</footer>
					{html`<script type="module" defer>
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({ startOnLoad: true });
          </script>`}
				</body>
			</html>
		);
	},
	{
		docType: true,
	},
);
