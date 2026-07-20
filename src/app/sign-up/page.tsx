"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Loading from "../Loading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // adjust to wherever Loading.tsx lives


const Signup = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // Save user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        uid: user.uid,
        createdAt: new Date(),
      });

      // Keep the loading screen up until the /login route has
      // actually finished rendering, not just until push() is called.
      startTransition(() => {
        router.push("/log in");
      });
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        startTransition(() => {
          router.push("/log in");
        });
      } else {
        setError(err?.message ?? String(err));
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Show the loading screen while the account is being created
  // AND while Next.js is transitioning to the next page.
  if (submitting || isPending) {
    return <Loading />;
  }

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center
      bg-radial from-blue-200 to-cyan-200 to-gray-300 p-9"
    >
      <form
        onSubmit={handleSignup}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl bg-radial from-[yellow] to-[lime] p-8 shadow-lg backdrop-blur"
      >
        <h1 className="text-center text-2xl font-semibold text-slate-800">
          Create an account
        </h1>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-slate-900">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        </div>
        <motion.button
            type="submit"
            disabled={submitting}
            whileHover={!submitting ? { scale: 1.03, y: -1 } : undefined}
            whileTap={!submitting ? { scale: 0.96 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mt-2 rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Sign up
          </motion.button>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <motion.div
            className="w-auto h-auto m-0"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
          <Link href="/log-in" className="font-medium text-slate-800 underline">
            Log in
          </Link>
        </motion.div>



        </p>
      </form>
    </div>
  );
};

export default Signup;


