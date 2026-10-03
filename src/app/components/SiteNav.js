import Link from "next/link";

// `floating` lets it sit over the hero's sky on the landing page. Everywhere
// else it's a normal bar in the flow, or it would cover the content.
export default function SiteNav({ floating = false }) {
  return (
    <header
      className={
        floating ? "absolute inset-x-0 top-0 z-20" : "relative border-b border-line bg-paper"
      }
    >
      {/* Width and padding track the hero's container so the logo lines up
          with the headline. */}
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* The logo carries the wordmark, so no text beside it. Pixelated
            rendering keeps the pixel art crisp instead of smoothing it. */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo/ecohouse-logo.svg"
            alt="Eco-House"
            className="h-9 w-auto"
            style={{ imageRendering: "pixelated" }}
          />
        </Link>

        <nav
          className="hidden items-center gap-9 text-[15px] text-ink-soft md:flex"
          aria-label="Main"
        >
          <Link className="transition-colors hover:text-ink" href="/#learn">
            How it works
          </Link>
          <Link className="transition-colors hover:text-ink" href="/#leaderboard">
            Leaderboard
          </Link>
          <Link className="transition-colors hover:text-ink" href="/learn">
            Blog
          </Link>
          <Link className="transition-colors hover:text-ink" href="/#download">
            Download
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-[15px]">
          <Link
            href="/login"
            className="hidden text-ink-soft transition-colors hover:text-ink sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-ink px-4 py-2.5 font-medium text-paper transition-colors hover:bg-ink/85"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
