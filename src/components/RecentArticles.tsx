
export default function RecentArticles() {
  return (
    <>
      <h2>Writing</h2>
      <ul>
        {recent_articles.map(({ description, slug, title }) => {
          return (
            <li class="card">
              <a href={`/writing/${slug}`}>
                <h3>{title}</h3>
                <p>{description}</p>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const recent_articles: RecentArticle[] = [
  {
    description: "Lately over on tech twitter, there's been quite a bit of talk around Platform as a Service (PaaS) infrastructure providers like Vercel and Netlify. Today I'll show you how to implement one of their most killer features, on your own cloud infra: preview deploys.",
    slug: "preview-deploys",
    title: "Implementing Preview Deploys via Github Actions",
  }, 
  {
    description: "Over the past 9 months I've been designing, building, and iterating an error monitoring system for the suite of Third-Party JavaScript widgets I contribute to at my day job. I recently re-designed the client portion of this system and wanted to walk through the solution we ended up with.",
    slug: "third-party-errors",
    title: "Monitoring Errors in Third-Party JavaScript Applications",
  },
  {
    description: "Over the past year, my team has been rebuilding our internal core library from a set of first principles. We have had the opportunity to develop some really great patterns, and today I'd like to share one of them with you; errors as values in asynchronous TypeScript.",
    slug: "better-async-typescript",
    title: "Better Async TypeScript",
  },
];

type RecentArticle = {
  description: string;
  slug: string;
  title: string;
}
