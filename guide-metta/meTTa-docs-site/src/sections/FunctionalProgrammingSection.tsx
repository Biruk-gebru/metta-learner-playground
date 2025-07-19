import React from "react";
import SectionNav from "../components/SectionNav";
import dynamic from "next/dynamic";
import { extractHeadingsFromChildren } from "../components/extractHeadings";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

const Content = (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 className="text-3xl font-bold mb-4">MeTTa and OpenCog Hyperon Guide</h1>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Introduction</h2>
    <p>
      OpenCog Hyperon is a next-generation cognitive framework, and MeTTa (Meta Type Talk) is its core programming language. MeTTa is often described as a meta-programming or "language of thought" for AGI: it lets programs introspect and modify themselves, blend symbolic and sub-symbolic reasoning, and operate directly on rich knowledge graphs. The language was designed from the ground up to support declarative, functional, and logical computation over a central Atomspace hypergraph (a directed knowledge graph). This guide introduces MeTTa for beginners, starting from functional programming basics, then covering MeTTa's unique features, nondeterminism, and examples of use.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Functional Programming Primer</h2>
    <p className="mb-4">
      Functional programming builds programs by applying and composing functions, rather than by giving an explicit sequence of commands. In this paradigm, functions are first-class citizens: you can pass functions as arguments, return them from other functions, or bind them to variables, just like any data. Pure functions, which have no side effects (they don't modify external state) and always return the same output for the same inputs, are emphasized. State is often immutable – instead of updating variables, functions create and return new values. This leads to code that is more predictable and easier to reason about. For example, summing a list of numbers in a functional style would use a function that returns a new total rather than looping with a changing counter.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-2">Key points of functional style:</h3>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Immutability:</b> Data structures don't change; functions produce new outputs without side effects.</li>
      <li><b>First-class functions:</b> You can assign functions to variables, pass them as arguments, and return them from other functions.</li>
      <li><b>Composition and higher-order functions:</b> Common operations like <code>map</code>, <code>filter</code>, and <code>fold</code> are used to process lists. These functions take other functions as inputs to transform data. For example:</li>
    </ul>
    <CodeEditor initialCode={'(map-atom (1 2 3) $x (+ $x 1)) ; yields (2 3 4)'} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Declarative style:</b> You describe <i>what</i> to compute (e.g. "sum these values") rather than how to loop and accumulate. A pure function always yields the same result for given inputs, so you can reason about code modularly without worrying about hidden state.</li>
    </ul>
    <p className="mb-4">
      These concepts underlie MeTTa's approach. In fact, MeTTa is very much a functional-language environment, extended with logic pattern-matching and graph-based data.
    </p>
    <h3 className="text-xl font-semibold mt-6 mb-2">let and let* Constructs</h3>
    <p className="mb-4">
      In many functional languages (especially Lisps and Schemes), <code>let</code> expressions allow you to bind local variables. A <code>let</code> introduces a new scope where you give names to values. For example, in Scheme-style syntax:
    </p>
    <CodeEditor initialCode={'(let $x 3 (+ $x 4)) ; yields 7, with x=3 only inside this let'} language="metta" />
    <p className="mb-4">
    Here, <code>x</code> is bound to <code>3</code>. The result of <code>(+ x 4)</code> is <code>7</code> within that local scope, and <code>x</code> disappears afterward. The binding in <code>let</code> happens before evaluating the body, so the right-hand side cannot refer to the new name being defined.
    </p>
    <p className="mb-4">
      By contrast, <code>let*</code> performs bindings sequentially. Each binding can use the variables defined by earlier bindings. For example:
    </p>
    <CodeEditor initialCode={'(let* (($x 2)\n  ($y (* $x 3))) ; here x is already 2\n  (+ $x $y))\n; yields 2 + 6 = 8'} language="metta" />
    <p>
      In this <code>let*</code>, x is first bound to 2, and then y is bound to <code>(* x 3)</code>, using the just-bound x. The result is 8. If we had used a plain <code>let</code> instead, the reference to x inside the definition of y would not see the new x, causing an error or undefined behavior. In practice, use <code>let</code> when all bindings are independent, and <code>let*</code> when later bindings need earlier ones. This keeps code flatter by avoiding nested scopes and lets you name intermediate results step by step.
    </p>
    <SectionNav next={{ label: "What is MeTTa?", slug: "what-is-metta" }} />
  </div>
);

export const FunctionalProgrammingSectionHeadings = extractHeadingsFromChildren(Content);

export default function FunctionalProgrammingSection() {
  return Content;
} 