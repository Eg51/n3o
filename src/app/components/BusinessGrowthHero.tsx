import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// ---- Component --------------------------------------------------------

export default function BusinessGrowthHero() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-200 via-cyan-100 to-gray-300 px-6 p-15 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        {/* Left column */}
        <div className="p-9 rounded-xl bg-slate-200">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5
           px-3 py-1 text-[11px] font-medium tracking-wide  text-[#0a0e17] pt-9 ">
            <span className="h-1.5 w-1.5 text-[#0a0e17] rounded-full bg-emerald-400" />
            GLOBAL CORPORATE ACCESS
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Fueling <span className="text-cyan-400">Business Growth </span>
            through Intelligence.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#0a0e17]">
            Ash Trust Bank provides institutional-grade treasury solutions,
            dynamic lending facilities, and sophisticated growth capital
            designed for the modern enterprise.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/chat"
              className="rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#0a0e17] transition hover:bg-cyan-300"
            >
              Speak to an Advisor
            </Link>
            <Link
              href="/chat"
              className="rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#0a0e17] transition hover:bg-cyan-300"
            >
              View Solutions
            </Link>
          </div>
        </div>

        {/* Right column: dashboard image */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/enterprise-dashboard.jpg"
              alt="Executive reviewing live market data on a trading desk"
              width={800}
              height={560}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Floating liquidity index card */}
          <div className="absolute -bottom-6 left-6 w-40 rounded-xl border border-none bg-gradient-to-br 
          from-blue-200 via-cyan-200 to-purple-200 p-4 shadow-lg">
            <p className="flex items-center gap-1 text-[11px] font-medium text-[#0a0e17]">
              <ArrowUpRight size={12} className="text-emerald-400" />
              Liquidity Index
            </p>
            <div className="mt-3 flex items-end gap-1.5">
              <span className="h-4 w-2 rounded-sm bg-cyan-400/30" />
              <span className="h-6 w-2 rounded-sm bg-cyan-400/50" />
              <span className="h-9 w-2 rounded-sm bg-cyan-400/70" />
              <span className="h-12 w-2 rounded-sm bg-cyan-400" />
              <span className="h-8 w-2 rounded-sm bg-cyan-400/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Section divider label */}
      <div className="mx-auto mt-20 max-w-6xl text-center">
        <h2 className="text-sm font-semibold tracking-wide text-[#0a0e17]">
          Cash Management Solutions
        </h2>
        <span className="mx-auto mt-2 block h-0.5 w-10 bg-cyan-400" />
      </div>
    </section>
  );
}
