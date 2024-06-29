import { css } from "hono/css";

export default function Footer() {
	return (
		<footer class={_footer}>
			<div class={_copyright}>
				<span>© {new Date().getFullYear()} Jacob Stordahl</span>
			</div>
		</footer>
	);
}

const _footer = css`
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 7vh;

  & * {
	  font-size: 14px;
	  font-family: var(--copy-family);
  }
`;
const _copyright = css`
  span {
    color: var(--text-secondary);
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 7px;
  }
`;
