import React from "react";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const StdLibHighlightsSectionHeadings = [
  { id: "metta-standard-library-highlights", title: "MeTTa Standard Library Highlights", level: 1 },
];

const StdLibHighlightsSection = () => {
  const navigation = getNavigationItems("standard-library");
  
  return (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="metta-standard-library-highlights" className="text-3xl font-bold mb-4">MeTTa Standard Library Highlights</h1>
    <p className="mb-4">
      The MeTTa standard library provides many built-in functions as grounded atoms. Some key ones for beginners:
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Equality/Reduction (<code>=</code>):</b> The <code>=</code> construct itself defines rules/functions. For example:</li>
    </ul>
    <CodeEditor initialCode={'(= (double $x) (* 2 $x))'} language="metta" />
    <p className="mb-4">
      defines a function <code>double</code>. There are identity helpers like <code>id</code>, <code>assertEqual</code>, etc., but most code just uses <code>=</code> for definitions.
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Math:</b> Besides <code>+</code> <code>-</code> <code>*</code> <code>/</code>, use <code>pow-math</code>, <code>sqrt-math</code>, etc. For example:</li>
    </ul>
    <CodeEditor initialCode={'(* 2 3)  ; yields 6\n!(pow-math 2 3)  ; yields 8.0\n!(sqrt-math 9)   ; yields 3.0\n!(floor-math 5.8) ; yields 5.0\n!(ceil-math 5.2)  ; yields 6.0\n!(round-math 5.6) ; yields 6.0'} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Nondeterminism:</b> <code>superpose</code>, <code>collapse</code> and their <code>-bind</code> variants manage multiple results. Use <code>superpose</code> to branch, and <code>collapse</code> to collect all branches. For example:</li>
    </ul>
    <CodeEditor initialCode={'!(superpose (1 2 3))  ; returns one of 1, 2, or 3\n!(collapse (superpose (1 2 3)))  ; returns (1 2 3)'} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>List/Tuple Ops:</b> <code>map-atom</code>, <code>filter-atom</code>, <code>foldl-atom</code> operate on tuples of atoms. For instance:</li>
    </ul>
    <CodeEditor initialCode={'! (map-atom (1 2 3) $x (+ $x 1))  ; gives (2 3 4)\n!(unique (superpose (a b b c)))  ; returns [a, b, c]\n!(unique-atom (a b b c))         ; returns (a b c)'} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Atomspace Interaction:</b> Besides <code>match</code> (see above), functions like <code>add-atom</code>, <code>remove-atom</code>, <code>get-atoms</code>, <code>for-each-in-atom</code> let you work with the Atomspace. These are crucial for building or querying knowledge.</li>
      <li><b>Control Flow:</b> Besides <code>if</code>, there is <code>case</code>, <code>chain</code>, etc., for conditional and sequential logic. Debugging tools include <code>println!</code> (prints an atom immediately when the code is run) and error handlers. <b>Note:</b> <code>println!</code> produces output at evaluation time (not returned as a function result), so use it sparingly for debugging.</li>
      <li><b>Quoting:</b> <code>quote</code> (or a leading single-quote) prevents evaluation. E.g. <code>'(parent John Alice)</code> produces the literal pattern <code>(parent John Alice)</code> as data. Use quoting when you want to manipulate code itself rather than run it.</li>
    </ul>
    <p className="mb-4">
      As a new user, focus on <code>=</code>, arithmetic, <code>superpose</code>/<code>collapse</code>, and list operations for a wide range of use cases.
    </p>
    <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-xl text-indigo-900 dark:text-indigo-200">
      <b>For more details, see the <a href="https://metta-stdlib.readthedocs.io/en/latest/mathematical_operations.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-700 dark:hover:text-indigo-300">MeTTa Standard Library documentation</a>.</b>
    </div>
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default StdLibHighlightsSection; 