import React from "react";
import SectionNav from "../components/SectionNav";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const AtomspaceSectionHeadings = [
  { id: "atomspace-and-hyperon-integration", title: "Atomspace and Hyperon Integration", level: 1 },
  { id: "core-data-types-in-metta", title: "Core Data Types in MeTTa", level: 2 },
];

const AtomspaceSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="atomspace-and-hyperon-integration" className="text-3xl font-bold mb-4">Atomspace and Hyperon Integration</h1>
    <p className="mb-4">
      All MeTTa execution occurs within the Atomspace, Hyperon's central knowledge store. The Atomspace is a (distributed) directed hypergraph for representing atoms and their links. Hyperon's Distributed Atomspace (DAS) scales this graph across machines, but MeTTa abstracts it so you use the same operations. When you define a MeTTa function, you are actually adding an <b>EqualityLink</b> atom to the Atomspace: its head is the function name and its body is the expression graph. Running a function performs pattern matching and graph rewrites in the Atomspace.
    </p>
    <p className="mb-4">
      You manipulate the Atomspace directly via built-in grounded atoms:
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>add-atom</b>, <b>remove-atom</b>: assert or retract atoms in the graph.</li>
      <li><b>match</b>: pattern-match a template against atoms in the Atomspace. For example:</li>
    </ul>
    <CodeEditor initialCode={'! (match &self (parent John $X) (println! ("John has a child!")))'} language="metta" />
    <p className="mb-4">
      This looks for any atom <code>(parent John $X)</code>. If found, it runs the "then" branch (e.g. printing a message). Variables like <code>$X</code> get bound to actual values from the graph if a match is found.
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>for-each-in-atom</b>, <b>get-atoms</b>: iterate over or retrieve sets of atoms matching certain criteria.</li>
    </ul>
    <p className="mb-4">
      In Hyperon, the Distributed Atomspace handles the complexity of sharding, replication, and persistence. You can trust that MeTTa's graph operations will work over large, decentralized datasets. In summary, MeTTa tightly couples with Hyperon's Atomspace: you write MeTTa code to query and rewrite the graph, and DAS takes care of the scale behind the scenes.
    </p>
    <h2 id="core-data-types-in-metta" className="text-2xl font-semibold mt-8 mb-2">Core Data Types in MeTTa</h2>
    <p className="mb-4">
      Everything in MeTTa is represented as an atom in the Atomspace graph. Basic atomic types include symbols (e.g. <code>Alice</code>), numbers, and strings. (The core library provides built-in symbols for numbers and strings.) You can also use Boolean atoms like <code>True</code>/<code>False</code>. Compound structures are built by concatenating atoms into lists (tuples) or links. For example, <code>(Add 2 3)</code> is an <b>AtomList</b> whose head is the symbol <code>Add</code> and whose elements are <code>2</code> and <code>3</code>.
    </p>
    <p className="mb-4">
      As the MeTTa formalism notes, combining symbols with the “concatenation” operator lets you form lists like <code>(a b)</code> or even nested lists like <code>((a b) c)</code>. All of these expressions – simple or nested – live in the Atomspace. In short, MeTTa’s values are atoms (constants or structured tuples) in this graph, and every piece of data or code is an atom.
    </p>
    <p className="mb-4">
      MeTTa also has a built-in type system that can be used to label symbols and catch errors. You can declare a symbol to be a type by using the <code>(: X Type)</code> syntax. For example:
    </p>
    <CodeEditor initialCode={`(: Human Type)
(: Bob Human)`} language="metta" />
    <p className="mb-4">
      declares that <code>Human</code> is a type, and <code>Bob</code> has type <code>Human</code>.
    </p>
    <p className="mb-4">
      MeTTa supports function types explicitly using an arrow syntax: <code>(: a {'->'} B A)</code> says that <code>a</code> is a function mapping type <code>B</code> to type <code>A</code>. In other words, if <code>b</code> has type <code>B</code>, then <code>(a b)</code> will have type <code>A</code>.
    </p>
    <CodeEditor initialCode={`(: f (-> Number Number))
(: g (-> Human Boolean))`} language="metta" />
    <p className="mb-4">
      At runtime the interpreter checks these types: you can test if a symbol is a function type using <code>(is-function X)</code>, which returns <code>True</code> or <code>False</code>. You can also enforce or cast types with <code>(type-cast X T &space)</code>, which returns <code>X</code> if it matches type <code>T</code> or an <code>Error</code> atom otherwise. For example:
    </p>
    <CodeEditor initialCode={`(: type1 Type)
!(type-cast Alice type1 &self)   ; returns Alice if Alice’s type is type1
!(type-cast 1 type1 &self)       ; returns Error if 1 does not have type1`} language="metta" />
    <p className="mb-4">
      If a type check fails (mismatched types, wrong arity, etc.), MeTTa reports an error.
    </p>
    <p className="mb-4">
      <b>Figure:</b> A function drawing from set A to set B (non-injective, non-surjective). In 
MeTTa, function types are written <code>{'(->'} A B)</code>, analogous to the mathematical arrow <code>
A &rarr; B</code>. MeTTa’s arrow types behave like standard function mappings: for example, one can annotate
a function as <code>{'(: f (-> Number Number))'}</code> to say “f maps a Number to a Number.” The system
will then enforce that calling <code>f</code> on a non-number is an error. You don’t always have to 
annotate types (MeTTa will infer or check as it executes), but explicit annotations help catch mistakes
early.
    </p>
    <CodeEditor initialCode={`(: Tree Type)                   ; declare Tree as a new type
(: Leaf Tree)                   ; Leaf is a constant of type Tree
(: Node (-> Number Tree Tree Tree)) ; Node takes a Number and two Trees and returns a Tree
(Node 5 Leaf Leaf)              ; valid Tree atom
(Node "x" Leaf Leaf)            ; type error`} language="metta" />
    <p className="mb-4">
      Here <code>Node</code> is a grounded or defined function that constructs a <code>Tree</code>. Because <code>Tree</code> was declared a type, the interpreter knows any result of <code>Leaf</code> or <code>Node</code> must satisfy that type. (You can similarly model records by using AtomLists or grounded procedures.) Any mismatches—like calling <code>(Node "x" Leaf Leaf)</code>—will cause a type error. If needed, you can use <code>(type-cast X T)</code> to explicitly attempt to cast or check an atom <code>X</code> against type <code>T</code>.
    </p>
    <p className="mb-4">
      <b>Important built-in data types and library functions in MeTTa include:</b>
    </p>
    <ul className="list-disc pl-6 mb-4">
      <li><b>Numbers and math:</b> MeTTa has numeric atoms (integers, floats) and arithmetic operations. You can write expressions like <code>(+ 2 3)</code> or <code>(* 5 6)</code> using infix forms. The standard library provides functions like <code>sqrt-math</code>, <code>pow-math</code>, <code>sin-math</code>, etc. (each returning an Atom number). For example:</li>
    </ul>
    <CodeEditor initialCode={`!(pow-math 2 3)   ; returns 8.0`} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Tuples and lists:</b> Any <b>AtomList</b> such as <code>(1 2 3)</code> is treated as a list of atoms. MeTTa provides higher-order functions to operate on these lists without explicit recursion. For instance, <code>map-atom</code> applies a function to each element:</li>
    </ul>
    <CodeEditor initialCode={`!(map-atom (1 2 3) $x (* $x 2))   ; returns (2 4 6)`} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Set-like operations:</b> <code>unique-atom</code> removes duplicates, <code>union-atom</code> merges lists:</li>
    </ul>
    <CodeEditor initialCode={`!(unique-atom (a b c d d))   ; yields (a b c d)
!(union-atom (a b b c) (b c c d)) ; yields (a b b c b c c d)`} language="metta" />
    <ul className="list-disc pl-6 mb-4">
      <li><b>Grounded atoms:</b> These atoms represent data or computations external to MeTTa (typically implemented in Python/C++). For example, you could register a Python function <code>fib</code> under a name, then use <code>(call-py fib $n)</code> in MeTTa; the interpreter will call the Python code and wrap the result in an Atom. Grounded atoms let MeTTa interface with databases, machine learning models, etc.</li>
      <li><b>Quoting (code-as-data):</b> MeTTa supports homoiconicity. Using <code>quote</code> or prefixing with <code>'</code>, you can treat MeTTa expressions as literal data. For example, <code>'(A B)</code> yields the literal tuple <code>(A B)</code> without evaluating <code>A</code> or <code>B</code>. This is useful for writing metaprograms or rule-generation code.</li>
      <li><b>Control and error handling:</b> MeTTa includes standard constructs like <code>if</code>, <code>case</code>, and <code>chain</code> for sequential or conditional evaluation, and <code>if-error</code>/<code>return-on-error</code> for catching errors. For example:</li>
    </ul>
    <CodeEditor initialCode={`(if (< $x 0) (println "Negative") (println "Non-neg"))`} language="metta" />
    <p className="mb-4">
      In summary, MeTTa programs manipulate atoms in the Atomspace. These atoms can be primitive (symbols, numbers, strings) or compound (lists, function applications). The language lets you define and check rich types: you declare new types with <code>(: Name Type)</code> and functions with arrow types <code>{'(-> ...)'}</code>. Behind the scenes the interpreter enforces these types, so well-typed programs either evaluate correctly or produce errors. By combining symbolic pattern-matching, typed functional constructs, and grounding to external code, MeTTa provides a flexible yet disciplined way to build AI systems.
    </p>
    <SectionNav previous={{ label: "Non-Determinism", slug: "nondeterminism" }} next={{ label: "Standard Library", slug: "standard-library" }} />
  </div>
);

export default AtomspaceSection; 