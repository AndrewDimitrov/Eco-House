import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} · Eco-House`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES[index + 1];

  return (
    <main className="flex-1 px-6 py-12">
      <article className="mx-auto max-w-2xl">
        <Link href="/learn" className="text-sm text-ink-soft transition hover:text-ink-soft">
          ← All articles
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">{article.title}</h1>
        <p className="mt-1 text-sm text-ink-soft">{article.readTime} read</p>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.summary}</p>

        <div className="mt-10 space-y-8">
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-semibold text-brand">{s.heading}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
            </section>
          ))}
        </div>

        {article.inGame && (
          <p className="mt-10 rounded-xl border border-line bg-paper p-4 text-sm text-ink-soft">
            <span className="font-medium text-ink">In the game: </span>
            {article.inGame}
          </p>
        )}

        {next && (
          <Link
            href={`/learn/${next.slug}`}
            className="mt-6 block rounded-xl border border-line p-4 transition hover:border-line"
          >
            <p className="text-xs uppercase tracking-wider text-ink-soft">Next</p>
            <p className="mt-1 font-medium">{next.title}</p>
          </Link>
        )}
      </article>
    </main>
  );
}
