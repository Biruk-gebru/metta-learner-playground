import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const chapters = [
  { label: "Functional Programming", slug: "functional-programming" },
  { label: "What is MeTTa?", slug: "what-is-metta" },
  { label: "Non-Determinism", slug: "nondeterminism" },
  { label: "Atomspace & Data Types", slug: "atomspace" },
  { label: "Standard Library", slug: "standard-library" },
  { label: "Recursion", slug: "recursion" },
  { label: "Best Practices", slug: "best-practices" },
  { label: "Installation", slug: "installation" },
];

const projects = [
  { label: "Family Tree", slug: "projects/family-tree" },
  { label: "Python & MeTTa Integration", slug: "projects/python-integration" },
  { label: "List Utilities & Custom Data Types", slug: "projects/list-utils" },
  { label: "Neuro-Symbolic", slug: "projects/neuro-symbolic" },
];

const extras = [
  { label: "Glossary", slug: "glossary" },
  { label: "References", slug: "references" },
];

const Sidebar = ({ dark }: { dark?: boolean }) => {
  const router = useRouter();
  const active = (slug: string) => router.asPath.includes(slug);

  return (
    <aside className={
      `w-64 min-h-screen flex flex-col gap-6 border-r p-6 ` +
      (dark
        ? 'bg-metta-darkPanel border-metta-darkPanel'
        : 'bg-metta-lightPanel border-metta-lightPanel')
    }>
      <div className={
        `font-bold text-lg mb-4 ` +
        (dark ? 'text-metta-darkText' : 'text-metta-lightText')
      }>Module Navigation</div>
      <nav className="flex-1 flex flex-col gap-2">
        <div className={
          `text-xs uppercase mb-1 tracking-wide ` +
          (dark ? 'text-metta-accent' : 'text-metta-accent')
        }>Chapters</div>
        {chapters.map((c) => (
          <Link key={c.slug} href={`/${c.slug}`} legacyBehavior>
            <a className={
              `block px-3 py-2 rounded-lg transition font-medium ` +
              (dark
                ? `text-metta-darkText hover:bg-metta-accent/20 ${active(c.slug) ? 'bg-metta-accent text-metta-darkBg' : ''}`
                : `text-metta-lightText hover:bg-metta-accent/10 ${active(c.slug) ? 'bg-metta-accent text-white' : ''}`)
            }>{c.label}</a>
          </Link>
        ))}
        <div className={
          `text-xs uppercase mt-4 mb-1 tracking-wide ` +
          (dark ? 'text-metta-accent' : 'text-metta-accent')
        }>Projects</div>
        {projects.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} legacyBehavior>
            <a className={
              `block px-3 py-2 rounded-lg transition font-medium ` +
              (dark
                ? `text-metta-darkText hover:bg-metta-accent/20 ${active(p.slug) ? 'bg-metta-accent text-metta-darkBg' : ''}`
                : `text-metta-lightText hover:bg-metta-accent/10 ${active(p.slug) ? 'bg-metta-accent text-white' : ''}`)
            }>{p.label}</a>
          </Link>
        ))}
        <div className={
          `text-xs uppercase mt-4 mb-1 tracking-wide ` +
          (dark ? 'text-metta-accent' : 'text-metta-accent')
        }>Other</div>
        {extras.map((e) => (
          <Link key={e.slug} href={`/${e.slug}`} legacyBehavior>
            <a className={
              `block px-3 py-2 rounded-lg transition font-medium ` +
              (dark
                ? `text-metta-darkText hover:bg-metta-accent/20 ${active(e.slug) ? 'bg-metta-accent text-metta-darkBg' : ''}`
                : `text-metta-lightText hover:bg-metta-accent/10 ${active(e.slug) ? 'bg-metta-accent text-white' : ''}`)
            }>{e.label}</a>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
