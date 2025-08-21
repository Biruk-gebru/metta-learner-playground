import React from "react";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const RecursionSectionHeadings = [
  { id: "recursion-and-iteration-in-metta", title: "Recursion and Iteration in MeTTa", level: 1 },
];

const RecursionSection = () => {
  const navigation = getNavigationItems("recursion");
  
  return (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="recursion-and-iteration-in-metta" className="text-3xl font-bold mb-4">Recursion and Iteration in MeTTa</h1>
    <p className="mb-4">
      MeTTa is a functional language, so it uses recursion instead of conventional loops. Here are common recursion patterns:
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Direct recursion:</b> Define a base case and a recursive case using multiple <code>=</code> rules. Example (factorial):</li>
    </ul>
    <CodeEditor initialCode={`(= (fact $n) 
    (if (== $n 0)
        1
        (* $n (fact (- $n 1)))))
!(fact 5)  ; computes 5 * 4 * 3 * 2 * 1 = 120`} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Pattern recursion:</b> Write multiple patterns for the same function, as shown above with <code>ancestor</code>. This is similar to Prolog. For example:</li>
    </ul>
    <CodeEditor initialCode={'(= (ancestor $X $Y) (parent $X $Y))                           ; base\n(= (ancestor $X $Y) (parent $X $Z) (ancestor $Z $Y))         ; recursive'} language="metta" />
    <p className="mb-4">
      MeTTa will try to match the first rule, and if not directly applicable, it will try the second, chaining the recursion.
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Tail recursion:</b> If the recursive call is the last operation, MeTTa (like Lisp) can optimize it and reuse the stack, effectively acting like a loop. You can write tail-recursive versions by carrying along an accumulator.</li>
      <li><b>Higher-order recursion:</b> You can often replace manual recursion over lists with <code>map-atom</code>, <code>filter-atom</code>, or <code>foldl-atom</code> (these are recursive in the library). For example, instead of writing your own loop to increment every element, just use <code>map-atom</code>. Fold operations like <code>foldl-atom</code> (left fold) can replace many accumulator-style recursions.</li>
    </ul>
    <p className="mb-4">
      Always include a terminating base case to avoid infinite recursion. If a branch has no valid matches, MeTTa simply fails that branch. You can use <code>collapse</code> to gather all results of a search. For example, to list all solutions of an ancestor query:
    </p>
    <CodeEditor initialCode={'!(collapse (ancestor John $Who))  ; might yield (Bob Alice Carol Mary)'} language="metta" />
    <p className="mb-4">
      These recursion patterns, along with <code>collapse</code> and basic list operations, cover a lot of use cases in MeTTa.
    </p>
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default RecursionSection; 