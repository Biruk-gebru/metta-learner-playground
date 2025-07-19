import React from "react";
import SectionNav from "../components/SectionNav";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const NonDeterminismSectionHeadings = [
  { id: "non-determinism-in-metta", title: "Non-Determinism in MeTTa", level: 1 },
  { id: "working-with-nondeterministic-results", title: "Working with Nondeterministic Results", level: 2 },
];

const NonDeterminismSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="non-determinism-in-metta" className="text-3xl font-bold mb-4">Non-Determinism in MeTTa</h1>
    <p className="mb-4">
      In most programming languages, a function returns exactly one output for given inputs. MeTTa relaxes this: a function can return multiple possible outcomes, representing a nondeterministic choice. For example, if you write:
    </p>
    <CodeEditor initialCode={'(= (pick-one) (superpose (1 2 3)))'} language="metta" />
    <p className="mb-4">
      then <code>!(pick-one)</code> will nondeterministically return 1, 2, and  3. In effect, each execution branch can pick a different result. Importantly, the values are fixed (1, 2, 3), but the order or branching is nondeterministic. One run might yield 2 first, another 1 first, etc.; MeTTa does not guarantee any order or priority.
    </p>
    <h2 id="working-with-nondeterministic-results" className="text-2xl font-semibold mt-8 mb-2">Working with Nondeterministic Results</h2>
    <ul className="list-disc pl-6 mb-4">
      <li><b>superpose:</b> Converts a tuple into a nondeterministic result. For example, <code>!(superpose (A B C))</code> produces three branches: one yields A, another B, another C. Each branch can continue independently.</li>
      <li><b>collapse:</b> Gathers all alternatives back into one concrete tuple. For instance, <code>!(collapse (superpose (A B C)))</code> returns the single tuple (A B C), collecting every branch. Use <code>collapse</code> when you want a deterministic summary of all possibilities.</li>
      <li><b>collapse-bind:</b> When a MeTTa operation yields multiple bindings (e.g. different variable assignments), <code>collapse-bind</code> runs the operation and returns all results with their variable bindings. In notation, it returns a nondeterministic list of (Value Bindings) pairs. For example:</li>
    </ul>
    <CodeEditor initialCode={`(= (bin) 0)\n(= (bin) 1)\n!(collapse-bind (bin))  ; yields two branches: (0 {}) and (1 {})`} language="metta" />
    <p className="mb-4">
      Here <code>(bin)</code> can yield 0 or 1; <code>collapse-bind</code> produces both, pairing each value with its (empty) binding map.
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>superpose-bind:</b> Takes the output of <code>collapse-bind</code> (or any sequence of (Value Bindings) pairs) and performs a <code>superpose</code> on the values only, discarding the binding information. In effect, it converts the result of <code>collapse-bind</code> into a plain nondeterministic value list. For example: <code>!(superpose-bind ((A &#123;...&#125;) (B &#123;...&#125;)))</code> is equivalent to <code>(superpose (A B))</code>. So <code>superpose-bind</code> yields the atoms A, B nondeterministically, without the binding maps.</li>
    </ul>
    <p className="mb-4">
      In practice, <code>superpose-bind</code> and <code>collapse-bind</code> are used together when writing MeTTa code that needs to preserve or examine variable bindings across branches. You often <b>collapse-bind</b> the top-level query to see all results with context, and use <b>superpose-bind</b> internally when applying nondeterminism under existing bindings. Think of <b>superpose</b>/<b>collapse</b> as working with pure values, while <b>superpose-bind</b>/<b>collapse-bind</b> handle value-plus-binding pairs.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Example: Quadratic Equation</h2>
    <p className="mb-4">
      Because of nondeterminism, you can represent searches or probabilistic choices compactly. For example, to solve a quadratic equation nondeterministically:
    </p>
    <CodeEditor initialCode={`(= (solve-quadratic $a $b $c)
   (let $D (- (* $b $b) (* (* 4 $a) $c))
     (if (< $D 0)
         (empty)
         (let $sqrt (sqrt-math $D)
           (superpose
             (
               (/ (+ (* -1 $b) $sqrt) (* 2 $a))
               (/ (- (* -1 $b) $sqrt) (* 2 $a))
             )
           )
         )
     )
   )
)`} language="metta" />
    <p className="mb-2 text-xs text-gray-500 dark:text-gray-400 italic">
      <b>Note:</b> The output of this code works better locally (in a native MeTTa REPL), with a small but noticeable improvement compared to the web playground.
    </p>
    <p className="mb-4">
      Calling <code>!(collapse (solve-quadratic 1 -3 2))</code> will yield (1 2), the two real roots of <i>x² - 3x + 2</i>, collected into a tuple. Here <code>solve-quadratic</code> nondeterministically branches on the two solutions, and <code>collapse</code> gathers them.
    </p>
    <SectionNav previous={{ label: "What is MeTTa?", slug: "what-is-metta" }} next={{ label: "Atomspace & Data Types", slug: "atomspace" }} />
  </div>
);

export default NonDeterminismSection; 