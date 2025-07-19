import React from "react";
import Layout from "../components/Layout";

const REFERENCES = [
  {
    label: "hyperon·PyPI",
    url: "https://pypi.org/project/hyperon/",
  },
  {
    label: "MeTTa Programming Language - ASI | Artificial Superintelligence Alliance",
    url: "https://superintelligence.io/portfolio/metta-programming-language/",
  },
  {
    label: "MeTTa in a Nutshell: Exploring the Language of AGI | by SingularityNET | Medium",
    url: "https://medium.com/singularitynet/metta-in-a-nutshell-exploring-the-language-of-agi-8d344c15b573",
  },
  {
    label: "Functional programming - Wikipedia",
    url: "https://en.wikipedia.org/wiki/Functional_programming",
  },
  {
    label: "Non-deterministic Computation — MeTTa Standard Library 0.1 documentation",
    url: "https://metta-stdlib.readthedocs.io/en/latest/non_deterministic_computation.html",
  },
  {
    label: "Set Operations — MeTTa Standard Library 0.1 documentation",
    url: "https://metta-stdlib.readthedocs.io/en/latest/set_operations.html",
  },
];

export default function ReferencesPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">References</h1>
        <p className="mb-6 text-slate-500">Click a link to visit the original source.</p>
        <ul className="space-y-4">
          {REFERENCES.map((ref) => (
            <li key={ref.url}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 dark:text-indigo-300 underline hover:text-indigo-900 dark:hover:text-indigo-100 transition"
              >
                {ref.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
} 