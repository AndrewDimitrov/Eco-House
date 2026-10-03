import Link from "next/link";
import PixelIcon from "@/app/components/ui/PixelIcon";

export default function GuideTile({ guide, index }) {
  return (
    <li>
      <Link
        href={`/learn/${guide.slug}`}
        className="group flex h-full flex-col border-t border-ink/80 pt-5"
      >
        <span className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[.16em] text-ink-soft">
          <span>Guide {String(index).padStart(2, "0")}</span>
          <span>{guide.readTime}</span>
        </span>
        <PixelIcon name={guide.icon} className="mt-6 h-7 w-7 text-brand" />
        <span className="mt-5 text-lg font-semibold leading-snug tracking-tight text-ink group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {guide.title}
        </span>
        <span className="mt-2 text-[15px] leading-relaxed text-ink-soft">{guide.summary}</span>
        <span className="mt-auto pt-6 font-medium text-ink">
          Read{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}
