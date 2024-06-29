import { css } from "hono/css";
import Links from "./Links";
import Status from "./Status";
import { _flex, _flexRow } from "./css";

export default function Hero() {
	const headline = "Hi, I'm Jacob.";
	const byline =
		"Full Stack Software Engineer building UI's and enabling product teams through design & developer tools.";
	const location = "Minneapolis, USA | UTC -5hrs";

	return (
		<div class={_hero}>
			<div>
				<h1>{headline}</h1>
				<p class={_byline}>{byline}</p>
				<p>{location}</p>
				<p class={_flex}>
					<Status />
					<span>
						Product Engineer @{" "}
						<a
							class="out"
							target="_blank"
							rel="noreferrer"
							href="http://stylitics.com"
						>
							Stylitics
						</a>
					</span>
				</p>
				<Links />
			</div>
			<img
				class="mobile-hide"
				src="./static/images/pfp.jpeg"
				alt="A photograph of the author."
				loading="lazy"
			/>
		</div>
	);
}

const _hero = css`
  ${_flexRow}
  margin-top: 50px; 
  margin-bottom: 25px;

  img {
    width: 175px; 
    height: 175px; 
    border-radius: 12px;
  }
`;

const _byline = css`
  font-size: calc(var(--copy-size) * 1.1); 
  margin-bottom: 5px;
`;
