import React from "react";
import SectionNav from "../components/SectionNav";

export const BestPracticesSectionHeadings = [
  { id: "best-practices-and-tips", title: "Best Practices and Tips", level: 1 },
];

const BestPracticesSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="best-practices-and-tips" className="text-3xl font-bold mb-4">Best Practices and Tips</h1>
    <ul className="list-disc pl-6 mb-4 space-y-3">
      <li>
        <b>Manage nondeterminism:</b> Uncontrolled nondeterminism can explode the search space. Use <code>collapse</code> when you want to stop forking and collect results. For instance, after a nondeterministic query, wrap it with <code>collapse</code> to get one tuple of answers.
      </li>
      <li>
        <b>Use library functions:</b> MeTTa's standard library is rich. Before writing complex recursion, check if a built-in (like <code>map-atom</code>, <code>filter-atom</code>, <code>unique-atom</code>, math functions, etc.) can do it. These are optimized and save time.
      </li>
      <li>
        <b>Ground heavy computations:</b> If some work is complex (e.g. heavy math or machine learning inference), implement it as a grounded atom in Python/C++ rather than in pure MeTTa rules. Pattern matching in MeTTa has overhead, so offloading heavy lifting can improve performance.
      </li>
      <li>
        <b>Quoting:</b> Only use <code>quote</code> when you need to treat code as data (e.g. generating rules on-the-fly). Unquoted symbols are treated as pattern variables or looked up as atoms. Remember the difference.
      </li>
      <li>
        <b>Debugging:</b> You can sprinkle <code>println!</code> calls in your code to output atoms during execution (since MeTTa prints them immediately). For example, <code>(!(println! "Debug: " $x))</code>. Also use <code>if-error</code> or <code>return-on-error</code> to catch unexpected cases. The <code>metta</code> CLI can often run in verbose mode for more logs.
      </li>
      <li>
        <b>Modularity:</b> Break logic into small named functions (each introduced with <code>=</code>). Give meaningful names and, if helpful, add type annotations (<code>(: funcName (-&gt; Number Number))</code>). Each rule is independent, which makes reasoning about each case easier.
      </li>
    </ul>
    <SectionNav previous={{ label: "Recursion", slug: "recursion" }} next={{ label: "Installation", slug: "installation" }} />
  </div>
);

export default BestPracticesSection; 