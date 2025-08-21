import React from "react";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
import dynamic from "next/dynamic";
import { extractHeadingsFromChildren } from "../components/extractHeadings";

const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

// Define manual headings for the table of contents
export const FunctionalProgrammingSectionHeadings = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "functional-programming-primer", title: "Functional Programming Primer", level: 2 },
  { id: "key-points", title: "Key Points of Functional Style", level: 3 },
  { id: "let-and-let-star", title: "Let and Let* Constructs", level: 2 },
  { id: "what-is-unification", title: "What is Unification?", level: 3 },
  { id: "single-variable-unification", title: "Single-Variable or Pattern Unification", level: 3 },
  { id: "sequential-unification", title: "Sequential Unification", level: 3 }
];

const FunctionalProgrammingSection = () => {
  const navigation = getNavigationItems("functional-programming");
  
  return (
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-sm sm:text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4">MeTTa and OpenCog Hyperon Guide</h1>
    <h2 id="introduction" className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Introduction</h2>
    <p>
      OpenCog Hyperon is a next-generation cognitive framework, and MeTTa (Meta Type Talk) is its core programming language. MeTTa is often described as a meta-programming or "language of thought" for AGI: it lets programs introspect and modify themselves, blend symbolic and sub-symbolic reasoning, and operate directly on rich knowledge graphs. The language was designed from the ground up to support declarative, functional, and logical computation over a central Atomspace hypergraph (a directed knowledge graph). This guide introduces MeTTa for beginners, starting from functional programming basics, then covering MeTTa's unique features, nondeterminism, and examples of use.
    </p>
    <h2 id="functional-programming-primer" className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Functional Programming Primer</h2>
    <p className="mb-4">
      Functional programming builds programs by applying and composing functions, rather than by giving an explicit sequence of commands. In this paradigm, functions are first-class citizens: you can pass functions as arguments, return them from other functions, or bind them to variables, just like any data. Pure functions, which have no side effects (they don't modify external state) and always return the same output for the same inputs, are emphasized. State is often immutable – instead of updating variables, functions create and return new values. This leads to code that is more predictable and easier to reason about. For example, summing a list of numbers in a functional style would use a function that returns a new total rather than looping with a changing counter.
    </p>
    <h3 id="key-points" className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Key Points of Functional Style</h3>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Immutability:</b> Data structures don't change; functions produce new outputs without side effects.</li>
      <li><b>First-class functions:</b> You can assign functions to variables, pass them as arguments, and return them from other functions.</li>
      <li><b>Composition and higher-order functions:</b> Common operations like <code>map</code>, <code>filter</code>, and <code>fold</code> are used to process lists. These functions take other functions as inputs to transform data. For example:</li>
    </ul>
    <CodeEditor initialCode={'!(map-atom (1 2 3) $x (+ $x 1)) ; yields (2 3 4)'} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      {/* <li><b>Declarative style:</b> You describe <i>what</i> to compute (e.g. "sum these values") rather than how to loop and accumulate. A pure function always yields the same result for given inputs, so you can reason about code modularly without worrying about hidden state.</li> */}
    </ul>
    <p className="mb-4">
      These concepts underlie MeTTa's approach. In fact, MeTTa is very much a functional-language environment, extended with logic pattern-matching and graph-based data.
    </p>
    <h2 id="let-and-let-star" className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Let and Let* Constructs</h2>
    <p className="mb-4">
      In MeTTa, the <code>let</code> construct binds a single variable (or pattern) to a value within a local scope. The <code>let*</code> construct allows you to bind several variables in sequence, where each binding can use the variables defined before it.
    </p>
    <p className="mb-4">
      But unlike many functional languages, MeTTa’s <code>let</code> and <code>let*</code> don’t just assign values—they perform <b>unification</b>. Unification is a process where the system tries to make two expressions structurally identical by finding suitable variable bindings. In functional programming, this is more general than simple assignment: it can match patterns, not just values.
    </p>
    <p className="mb-4">
      <b>What is unification?</b><br/>
      Unification is a key concept in logic and functional programming languages. Instead of just assigning a value to a variable, unification tries to find a way to make two expressions equal by solving for variables. For example, unifying <code>$x</code> with <code>3</code> means <code>$x</code> becomes <code>3</code>. But unifying <code>($x $y)</code> with <code>(1 2)</code> means <code>$x</code> becomes <code>1</code> and <code>$y</code> becomes <code>2</code>.
    </p>
    <p className="mb-4">
      This is more powerful than assignment, because it can solve for multiple variables at once, and can work with patterns, not just concrete values.
    </p>
    <p className="mb-4">
      <b>let: single-variable or pattern unification</b><br/>
      In MeTTa, <code>let</code> performs unification between a variable or pattern and a value, and then evaluates the body with that binding:
    </p>
    <CodeEditor initialCode={'!(let $x 3 (+ $x 4))\n; yields 7, $x is unified with 3 in the body'} language="metta" />
    <CodeEditor initialCode={'!(let ($x $y) (1 2) (+ $x $y))\n; yields 3, $x is unified with 1, $y with 2'} language="metta" />
    <p className="mb-4">
      <b>let*: sequential unification</b><br/>
      <code>let*</code> allows you to perform a sequence of unifications, where each step can use the results of previous steps:
    </p>
    <CodeEditor initialCode={'!(let* (($x 2)\n  ($y (* $x 3)))\n  (+ $x $y))\n; yields 8, $x is unified with 2, $y is unified with (* $x 3) = 6'} language="metta" />
    <CodeEditor initialCode={'!(let* ((($a $b) (1 2))\n  ($sum (+ $a $b)))\n  $sum)\n; yields 3, $a is 1, $b is 2, $sum is 3'} language="metta" />
    <p className="mb-4">
      Because <code>let</code> and <code>let*</code> use unification, you can do more than just assign values—you can destructure data, match patterns, and write more general code. This is a powerful feature that sets MeTTa apart from many other functional languages.
    </p>
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default FunctionalProgrammingSection; 