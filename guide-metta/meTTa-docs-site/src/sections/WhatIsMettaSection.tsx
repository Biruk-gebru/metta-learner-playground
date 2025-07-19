import React from "react";
import dynamic from "next/dynamic";
import SectionNav from "../components/SectionNav";
const MermaidRenderer = dynamic(() => import("../components/MermaidRenderer"), { ssr: false });
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

// Manual TOC headings for this page
export const WhatIsMettaSectionHeadings = [
  { id: "the-metta-language", title: "The MeTTa Language", level: 1 },
  { id: "knowledge-graph-integration", title: "Knowledge-Graph Integration", level: 2 },
  { id: "functional-logical-paradigm", title: "Functional & Logical Paradigm", level: 2 },
  { id: "self-modification", title: "Self-Modification", level: 2 },
  { id: "gradual-dependent-type-system", title: "Gradual Dependent Type System", level: 2 },
  { id: "grounded-atoms-neural-integration", title: "Grounded Atoms / Neural Integration", level: 2 },
  { id: "non-determinism", title: "Non-Determinism", level: 2 },
];

const WhatIsMettaSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="the-metta-language" className="text-3xl font-bold mb-4">The MeTTa Language</h1>
    <p className="mb-4">
      MeTTa is a novel multi-paradigm language built for knowledge-centric AI. It combines functional style, logical pattern matching, and probabilistic constructs, all operating over a unified Atomspace graph. The Atomspace is a directed hypergraph: every piece of data or code is an atom (a node or a link) in a graph. This means, for example, that a symbolic term like <code>(Add 2 3)</code> is represented as a Link atom "Add" connected to the Number atoms 2 and 3. Code and data share the same graph structure, allowing introspection. Key features of MeTTa include:
    </p>
    <h2 id="knowledge-graph-integration" className="text-2xl font-semibold mt-8 mb-2">Knowledge-Graph Integration</h2>
    <p className="mb-4">
      MeTTa programs run inside the Atomspace graph, not on separate memory. All values (symbols, numbers, strings, tuples) are graph atoms. The evaluator queries and rewrites the graph during execution. This makes MeTTa ideal for AI applications that require representing and manipulating rich, structured knowledge. For instance, you can encode not just primitive values but also complex relationships or concepts as subgraphs.
    </p>
    <MermaidRenderer code={`graph TD\n  subgraph Atomspace\n    A[Symbol node Add]\n    B[Number node 2]\n    C[Number node 3]\n  end\n  A --> B\n  A --> C`} />
    <p className="mb-4">
      <b>Example:</b> An Atomspace with a Link atom <code>Add</code> connected to two number atoms (2 and 3). This could represent the expression <code>(Add 2 3)</code> all within the knowledge graph.
    </p>
    <h2 id="functional-logical-paradigm" className="text-2xl font-semibold mt-8 mb-2">Functional & Logical Paradigm</h2>
    <p className="mb-4">
      MeTTa supports functional operations like arithmetic or recursion, and logical pattern matching in the same language. You define functions/rules using <code>=</code> and patterns (similar to Prolog clauses). For example, to define an "ancestor" relation, you can write:
    </p>
    <CodeEditor initialCode={`(= (parent $X $Y) (inheritance $X $Y))\n(= (ancestor $X $Y) (parent $X $Y))                             ; base case\n(= (ancestor $X $Y) (parent $X $Z) (ancestor $Z $Y))           ; recursive case`} language="metta" />
    <p className="mb-4">
      These pattern-based rules say that "X is a parent of Y" if the graph has <code>(inheritance X Y)</code>, and "X is an ancestor of Y" if X is a parent of Y or X is a parent of Z and Z is an ancestor of Y. The pattern variables like <code>$X, $Y, $Z</code> are unified against atoms in the graph. This declarative approach means MeTTa handles the search and matching for you.
    </p>
    <h2 id="self-modification" className="text-2xl font-semibold mt-8 mb-2">Self-Modification</h2>
    <p className="mb-4">
      MeTTa is self-reflective. Programs can generate and modify MeTTa code at runtime. Because code is just data in the Atomspace, a MeTTa rule can assert new atoms or rewrite existing ones. This makes it straightforward to implement learning or meta-programming: for example, a rule could detect a new pattern and add a new inference rule to the graph.
    </p>
    <h2 id="gradual-dependent-type-system" className="text-2xl font-semibold mt-8 mb-2">Gradual Dependent Type System</h2>
    <p className="mb-4">
      MeTTa has an expressive type system with gradual, dependent types. You can specify types like <code>{'(-> Number Number)'}</code> for functions, and use library functions (<code>is-function</code>, <code>type-cast</code>, etc.) to check or enforce types. This is advanced, but beginners can mostly work without explicit types. The type system provides safety (catching mismatches) when used.
    </p>
    <h2 id="grounded-atoms-neural-integration" className="text-2xl font-semibold mt-8 mb-2">Grounded Atoms / Neural Integration</h2>
    <p className="mb-4">
      MeTTa supports grounded atoms, which are links in the Atomspace bound to external computations or data. For example, a grounded atom could wrap a Python function or a neural network evaluator. This allows seamless neuro-symbolic reasoning: you can call a pre-trained neural net from inside MeTTa and then use the result in symbolic rules. For instance, a grounded atom <code>CatRecognizer</code> might take image data and return a confidence score; MeTTa rules can then pattern-match on that score.
    </p>
    <h2 id="non-determinism" className="text-2xl font-semibold mt-8 mb-2">Non-Determinism</h2>
    <p className="mb-4">
      Uniquely, MeTTa functions can produce multiple possible results. Instead of returning a single value, a function might nondeterministically yield a set of alternatives. Special built-in constructs <code>superpose</code>, <code>collapse</code> (and their <code>*-bind</code> variants) let you explore these branches. This effectively turns MeTTa into a search or inference engine, useful for things like combinatorics or probabilistic logic.
    </p>
    <p className="mb-4">
      Overall, MeTTa is essentially a "declarative knowledge-language" where you describe rules and let the engine handle matching, branching, and graph operations. It is sometimes called "Atomese 2" as a successor to OpenCog's Atomese. Its design prioritizes concise knowledge representation and reasoning over traditional imperative control flow.
    </p>
    <SectionNav previous={{ label: "Functional Programming", slug: "functional-programming" }} next={{ label: "Non-Determinism", slug: "nondeterminism" }} />
  </div>
);

export default WhatIsMettaSection; 