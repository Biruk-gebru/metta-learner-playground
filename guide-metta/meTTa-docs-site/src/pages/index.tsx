import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

// Index page placeholder
export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-black rounded-2xl shadow-lg w-full max-w-2xl h-64 flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-t from-indigo-800/80 to-transparent animate-pulse" />
          </div>
          <h1 className="relative z-10 text-3xl md:text-4xl font-bold text-white text-center px-8">
            Learn Symbolic & Neuro-Symbolic<br />Programming with MeTTa
          </h1>
        </div>
        <div className="flex gap-4 mb-8">
          <Link href="/functional-programming" legacyBehavior>
            <a className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Start Learning</a>
          </Link>
          <Link href="/what-is-metta" legacyBehavior>
            <a className="px-6 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold shadow hover:bg-slate-100 dark:hover:bg-slate-800 transition">View Docs</a>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/projects/family-tree" legacyBehavior>
            <a className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium shadow hover:bg-slate-200 dark:hover:bg-slate-700 transition">Explore Examples</a>
          </Link>
          <a href="https://discord.gg/opencog" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium shadow hover:bg-slate-200 dark:hover:bg-slate-700 transition">Join Community</a>
        </div>
      </div>
    </Layout>
  );
}
