import { css, cx } from "hono/css";
import type { PropsWithChildren } from "hono/jsx";

export default function Card({
	children,
	dashed = false,
	description = undefined,
	tags = undefined,
	title = undefined,
	url = undefined,
}: PropsWithChildren<CardProps>) {
	return (
		<div class={dashed ? cx(_card, _cardDashed) : _card}>
			{url ? (
				<a href={url}>
					{children ?? (
						<CardContent description={description} tags={tags} title={title} />
					)}
				</a>
			) : (
				<>
					{children ?? (
						<CardContent description={description} tags={tags} title={title} />
					)}
				</>
			)}
		</div>
	);
}

function CardContent({
	description,
	title,
	tags,
}: Pick<CardProps, "description" | "tags" | "title">) {
	return (
		<>
			{title && <h3>{title}</h3>}
			<p>{description}</p>
			{tags && (
				<div class={_tags}>
					{tags.map((str) => (
						<span>{str}</span>
					))}
				</div>
			)}
		</>
	);
}

export type CardProps = {
	dashed?: boolean | undefined;
	description?: string | undefined;
	tags?: string[] | undefined;
	title?: string | undefined;
	url?: string | undefined;
};

const _card = css`
  border: var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 1rem;
  & * { 
    margin: 0; 
  }
  & > a {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-decoration: none;
    &:hover > h3 {
      text-decoration: underline;
    }
  }
  h3 {
    margin-bottom: 3px;
  }
  p {
    color: var(--text-primary);
    font-size: calc(var(--copy-size) * 0.9);
    line-height: 20px;
  }
`;

const _cardDashed = css`
  border-style: dashed;
`;
const _tags = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  span {
    font-size: calc(var(--copy-size) * 0.8);
    background-color: var(--light-grey);
    padding: 4px;
    border-radius: 5px;
  }
`;
