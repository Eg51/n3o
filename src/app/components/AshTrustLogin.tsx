"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  User,
  Lock,
  ShieldCheck,
  TrendingUp,
  Globe,
} from "lucide-react";
import GrowthToolsCTA from "./GrowthToolsCTA";

// ---- Data ---------------------------------------------------------------

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Military-Grade Encryption",
    description:
      "End-to-end multi-layer security protocols protecting every transaction and asset.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "AI-driven insights to help you optimize your portfolio and capital allocation.",
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    description:
      "Move capital across borders with zero-latency execution and real-time conversion.",
  },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Security Audit", href: "#" },
  { label: "Legal", href: "#" },
];

// ---- Animation variants ---------------------------------------------------

const navVariants: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const cardsContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardFade: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const gridContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ---- Component ------------------------------------------------------------

export default function AshTrustHero() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-gray-300
    rounded-3x1 px-4 pt-8 text-[#0a0e17] sm:px-6 sm:pt-13">
      <div className="mx-auto max-w-6xl">
        {/* Nav */}
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-10">
            <Image
              src="/loadLogo_shield_smooth.png"
              alt="Shield logo"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-base font-bold sm:text-lg">
              Ash Trust <span className="text-cyan-500">Bank</span>
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/log-in"
              className="hidden text-sm text-[#0a0e17] cursor-pointer transition hover:text-gray-500 xs:inline sm:inline"
            >
              Log In
            </Link>

            <Link href={'/sign-up'}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="rounded-md border border-cyan-500 px-3.5 py-1.5 text-xs font-medium text-cyan-600 transition hover:bg-cyan-400/10 sm:px-4 sm:text-sm"
              >
                Open Account
              </motion.button>

            </Link>

          </div>
        </motion.nav>

        {/* Hero content */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:gap-12 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Left column */}
          <motion.div initial="hidden" animate="visible" variants={heroContainer}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide text-[#0a0e17]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              NEXT GENERATION BANKING
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
            >
              Institutional-Grade
              <br />
              <span className="text-cyan-600">Finance for the Modern World</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-md text-sm leading-relaxed text-[#0a0e17]/80"
            >
              Experience the precision of precision tools combined
              with the agility of modern digital banking. Secure, seamless,
              and engineered for the high-net-worth future.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-500 px-5 py-2.5 text-sm
                cursor-pointer font-semibold text-slate-900 transition hover:bg-cyan-400 sm:w-auto"
              >
                Get Started
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="w-full rounded-md border border-[#0a0e17]/20 px-5 py-2.5 text-sm
                cursor-pointer font-semibold text-[#0a0e17] transition hover:bg-white/20 sm:w-auto"
              >
                View Rates
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-8 sm:mt-12 sm:gap-12"
            >
              <div>
                <p className="text-[11px] tracking-wide text-[#0a0e17]/70">
                  ASSETS SECURED
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0a0e17]">
                  $24.8B+
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-wide text-[#0a0e17]/70">
                  GLOBAL REACH
                </p>
                <p className="mt-1 text-lg font-semibold text-[#0a0e17]">
                  140+ Countries
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardsContainer}
            className="flex flex-col gap-5 cursor-pointer"
          >
            {/* Ash Trust Elite card */}
            <motion.div
              variants={cardFade}
              whileHover={{ y: -4 }}
              className="rounded-2xl border absolutecursor-pointer border-white/10 bg-gradient-to-br from-blue-200 via-cyan-200 to-purple-200 p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="flex items-center justify-between cursor-pointer">
                <p className="text-base font-semibold text-slate-900">
                  Ash Trust Bank <span className="text-cyan-700">Elite</span>
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/40 text-[#0a0e17]" />
              </div>

              <p className="mt-10 text-[11px] font-medium tracking-wide text-[#0a0e17]">
                @Username
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-6 w-9 rounded-sm bg-white/50" />
                <span className="text-sm font-medium tracking-widest text-[#0a0e17]">
                  •••• •••• •••• 8820
                </span>
              </div>
            </motion.div>

            {/* Manage your wealth card */}
            <motion.div
              variants={cardFade}
              whileHover={{ y: -4 }}
              className="rounded-2xl cursor-pointer border border-white/10 bg-gradient-to-br from-blue-200 via-cyan-200 to-purple-200 p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <h2 className="text-base font-semibold text-[#0a0e17]">
                Manage your wealth
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 rounded-md border border-slate-900/10 bg-white/40 px-3 py-2.5">
                  <User size={15} className="text-[#0a0e17]" />
                  <input
                    type="text"
                    placeholder="Username or Account ID"
                    className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 rounded-md cursor-pointer border border-slate-900/10 bg-white/40 px-3 py-2.5">
                  <Lock size={15} className="text-[#0a0e17]" />
                  <input
                    type="password"
                    placeholder="Passcode"
                    className="w-full bg-transparent text-sm text-[#0a0e17] placeholder:text-slate-500 focus:outline-none"
                  />
                </div>

                <Link href="/log-in">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="mt-1 w-full rounded-md border border-cyan-700/40 bg-cyan-700/10 py-2.5
                    cursor-pointer text-sm font-semibold text-cyan-800 transition hover:bg-cyan-700/20"
                  >
                    Secure Sign In
                  </motion.button>
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#0a0e17]">
                <Link href="/forgotPassword" className="cursor-pointer hover:text-slate-800">
                  Forgot password?
                </Link>
                <span>
                  New here?{""}
                  <Link
                    href={"/sign-up"}
                    className="font-medium cursor-pointer text-cyan-800 hover:underline"
                  >
                    Create Account
                  </Link>
                </span>
              </div>
            </motion.div>

            {/* Market status bar */}
            <motion.div
              variants={cardFade}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-[11px] text-[#0a0e17]"
            >
              <span className="flex items-center gap-1.5">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
                MARKET STATUS: OPEN
              </span>
              <span className="flex gap-3">
                <span>
                  LUM <span className="text-emerald-600">+1.24%</span>
                </span>
                <span>
                  BTC <span className="text-emerald-600">+0.82%</span>
                </span>
              </span>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="pb-8 text-center text-[11px] tracking-wide text-[#0a0e17]/70 sm:pb-10"
        >
          EXPLORE SECURITY FEATURES
        </motion.p>

        {/* Security features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={gridContainer}
          className="grid grid-cols-1 gap-5 pb-14 sm:grid-cols-2 sm:pb-16 md:grid-cols-3"
        >
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={gridItem}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/10 p-6 transition-shadow hover:shadow-lg"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/20 text-cyan-600">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-[#0a0e17]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0a0e17]/80">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
        <GrowthToolsCTA/>
      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-white/10 bg-transprent"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 text-center text-[11px]
         text-[#0a0e17] sm:flex-row sm:px-6 sm:text-left">
          <p>© 2024 Ash Trust Bank plc. All rights reserved. Member FDIC.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-medium uppercase cursor-progress tracking-wide text-cyan-600 hover:text-cyan-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
