import { raw } from "hono/html";
import { highlight_code, type TArticle } from "../data";

export default async function Article({ content, date, title }: TArticle) {
  const published = new Date(date).toLocaleDateString('en', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <>
      <h1>{title}</h1> 
      <p>Published {published}</p>
      <article>{raw(await highlight_code(content))}</article>
    </>
  )
};

