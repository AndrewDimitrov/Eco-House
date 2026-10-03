import Icon from "@/app/components/ui/Icon";

export default function SponsorCard({ item }) {
  return (
    <li className="flex h-full flex-col rounded-xl border border-line bg-paper p-5">
      <span className="flex aspect-[4/3] items-center justify-center rounded-lg bg-band text-brand">
        <Icon name={item.icon} className="h-12 w-12" strokeWidth={1.4} />
      </span>
      <span className="mt-4 font-mono text-[13px] uppercase tracking-[.16em] text-ink-soft">
        {item.category}
      </span>
      <span className="mt-1 text-lg font-semibold tracking-tight text-ink">{item.name}</span>
      <span className="mt-1 text-base leading-relaxed text-ink-soft">{item.blurb}</span>
      <span className="mt-auto border-t border-line pt-4 font-mono text-xs text-brand">
        {item.saving}
      </span>
    </li>
  );
}
