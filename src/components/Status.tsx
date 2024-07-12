import { css } from "hono/css";

export default function Status() {
	return <span class={_status} />;
}

const _status = css`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 100px;
  background-color: var(--green);
  box-shadow: 0px 0px 7px var(--green);
  margin-bottom: -2px;

  @media (prefers-color-scheme: dark) {
    & {
      filter: saturate(0.7) brightness(0.9);
    }
  }
`;
