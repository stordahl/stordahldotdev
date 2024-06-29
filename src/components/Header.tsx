import { css } from "hono/css";

export default function Header() {
	const pages = ["writing", "talks", "systems"];
	return (
		<header class={_header}>
			<span>stordahl.dev</span>
			<nav class="print-hide">
				<a href="/">home</a>
				{pages.map((text) => (
					<a href={`/${text}`}>{text}</a>
				))}
			</nav>
		</header>
	);
}

const _header = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: clamp(12px, 3vw, 30px) 1rem;
  margin: auto;
  width: clamp(380px, calc(85vw + 5px), 750px);
  gap: 8px;

  span {
    font-size: clamp(1.1rem, calc(1vw + 1rem), 1.35rem);
    font-family: var(--heading-family);
    color: var(--text-secondary);
  }

  nav {
	  margin: 0;
    padding: 0;
    display: flex;
    gap: clamp(.5rem, 2vw, 30px);
  }

  a {
    text-decoration: none;
    display: block;
    font-size: clamp(1rem, calc(.3rem + 1vw), 1.2rem);
    font-family: var(--heading-family);
    &:hover {
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 400px) {
    & {
      flex-direction: row;
      align-items: center;
    }
  }
`;
