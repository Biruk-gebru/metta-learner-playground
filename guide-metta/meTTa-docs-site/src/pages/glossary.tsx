import React, { useState } from "react";
import Layout from "../components/Layout";

const GLOSSARY = [
  { term: "Atom", def: "A basic unit of knowledge in MeTTa's Atomspace graph." },
  { term: "Atomspace", def: "The central knowledge graph in Hyperon, storing all atoms and their links." },
  { term: "Collapse", def: "A MeTTa operation that collects all nondeterministic results into a tuple." },
  { term: "Expression", def: "A combination of atoms representing data or code." },
  { term: "Grounded Atom", def: "An atom linked to external computation or data (e.g., Python function, neural net)." },
  { term: "MeTTa", def: "Meta Type Talk, the core language of OpenCog Hyperon." },
  { term: "Node", def: "A symbol or value atom in the Atomspace graph." },
  { term: "Predicate", def: "A function or relation that returns true/false or matches patterns." },
  { term: "Superpose", def: "A MeTTa operation that creates nondeterministic branches from a tuple of values." },
  { term: "Variable", def: "A placeholder (e.g., $X) used in pattern matching and rules." },
  { term: "Collapse-bind", def: "Collects all value-binding pairs from a nondeterministic operation." },
  { term: "Superpose-bind", def: "Converts value-binding pairs into nondeterministic values, discarding bindings." },
  { term: "Grounded Function", def: "A function implemented outside MeTTa, typically in Python or C++." },
  { term: "Pattern Matching", def: "The process of matching expressions against rules or templates in MeTTa." },
  { term: "Rule", def: "A pattern-based definition in MeTTa, often using = to define logic or functions." },
];

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const filtered = GLOSSARY.filter((item) =>
    item.term.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Glossary</h1>
        <p className="mb-6 text-slate-500">Explore the definitions of key terms used in the MeTTa language.</p>
        <input
          type="text"
          placeholder="Search for a term"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-xl border border-slate-300 dark:bg-slate-800 dark:text-white dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {filtered.length === 0 ? (
            <li className="py-8 text-center text-slate-400">No terms found.</li>
          ) : filtered.map((item) => (
            <li key={item.term} className="py-4 flex flex-col gap-1">
              <span className="font-semibold text-lg">{item.term}</span>
              <span className="text-slate-600 dark:text-slate-300">{item.def}</span>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
} 