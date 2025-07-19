import React from "react";
import dynamic from "next/dynamic";
import SectionNav from "../components/SectionNav";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const ProjectNondeterministicMathSectionHeadings = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "metta-knowledge-base", title: "1. Define a Symbolic Knowledge Base", level: 1 },
  { id: "python-integration", title: "2. Python Integration: Atoms, Symbols, and Expressions", level: 1 },
  { id: "full-python-example", title: "3. Full Python Example", level: 1 },
];

const ProjectNondeterministicMathSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-100 bg-slate-900 rounded-2xl shadow">
    <h1 className="text-3xl font-bold mb-6">Project 2: Exploring MeTTa Expressions and Symbols from Python</h1>

    <h2 id="overview" className="text-2xl font-semibold mt-8 mb-2">Overview</h2>
    <p>
      This project demonstrates how to define symbolic knowledge in MeTTa, run queries from Python, and inspect how MeTTa atoms, symbols, and variables are handled in Python code. You'll see how to build a simple knowledge base, query it, and programmatically work with MeTTa expressions.
    </p>

    <h2 id="metta-knowledge-base" className="text-2xl font-semibold mt-8 mb-2">1. Define a Symbolic Knowledge Base</h2>
    <p>
      Let's model a world of people and their pets. We'll define facts and rules in MeTTa:
    </p>
    <CodeEditor language="metta" initialCode={`(owner Alice Cat)
(owner Bob Dog)
(owner Carol Parrot)

(= (has-pet $person $animal)
    (owner $person $animal)
)

(= (is-cat-owner $person)
    (owner $person Cat)
)`} />
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li><b>(owner Alice Cat):</b> Alice owns a cat. Similar for Bob and Carol.</li>
      <li><b>(= (has-pet $person $animal) ...):</b> Rule: a person has a pet if they are the owner.</li>
      <li><b>(= (is-cat-owner $person) ...):</b> Rule: a person is a cat owner if they own a cat.</li>
    </ul>

    <h2 id="python-integration" className="text-2xl font-semibold mt-8 mb-2">2. Python Integration: Atoms, Symbols, and Expressions</h2>
    <p>
      Now, let's see how to interact with MeTTa from Python using the modern API. We'll register a Python function as a grounded atom, define a MeTTa rule that calls it, and extract results from MeTTa queries:
    </p>
    <CodeEditor language="python" initialCode={`from hyperon import MeTTa, Atom

from hyperon import MeTTa, Atom

mt = MeTTa()

metta_code = '''
(owner Alice Cat)
(owner Bob Dog)
(owner Carol Parrot)

(= (has-pet)
    (match &self (owner $person $animal) (Owner:$person , Pet:$animal))
)

(= (is-cat-owner)
    (match &self (owner $person Cat) $person)
)
'''

mt.run(metta_code)

# Query: Who owns a cat?
result = mt.run('!(is-cat-owner)')
print('Cat owners:', result)

# Query: Who owns what?
result2 = mt.run('!(has-pet)')
print('All owner-pet pairs:', result2)

`} />
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li><b>MeTTa instance:</b> <code>MeTTa()</code> creates a new interpreter.</li>
      <li><b>Registering Python functions:</b> <code>mt.register_atom("fib", fib)</code> makes the Python <code>fib</code> function callable from MeTTa.</li>
      <li><b>Defining rules:</b> <code>mt.run('(= (fib-wrapper $n) (call-py fib $n))')</code> defines a MeTTa rule that calls the Python function.</li>
      <li><b>Querying:</b> <code>mt.run('(fib-wrapper 6)')</code> runs the MeTTa rule and returns a list of result atoms.</li>
      <li><b>Extracting values:</b> <code>result[0].get_value()</code> gets the integer value from the result atom (if present).</li>
    </ul>

    <h2 id="full-python-example" className="text-2xl font-semibold mt-8 mb-2">3. Full Python Example</h2>
    <p>
      Here is the complete Python code. Run this in your environment to see the output and experiment with MeTTa expressions and symbols:
    </p>
    <CodeEditor language="python" initialCode={`from hyperon import MeTTa, Atom

from hyperon import MeTTa, Atom

mt = MeTTa()

metta_code = '''
(owner Alice Cat)
(owner Bob Dog)
(owner Carol Parrot)

(= (has-pet)
    (match &self (owner $person $animal) (Owner:$person , Pet:$animal))
)

(= (is-cat-owner)
    (match &self (owner $person Cat) $person)
)
'''

mt.run(metta_code)

# Query: Who owns a cat?
result = mt.run('!(is-cat-owner)')
print('Cat owners:', result)

# Query: Who owns what?
result2 = mt.run('!(has-pet)')
print('All owner-pet pairs:', result2)

`} />
    <p className="mt-4">
      <b>Expected output:</b>
      <pre className="bg-slate-800 text-slate-100 rounded p-4 mt-2 text-sm overflow-x-auto">Cat owners: [Alice]
All owner-pet pairs: [(Alice, Cat), (Bob, Dog), (Carol, Parrot)]
Atom: (owner Alice Cat);

</pre>
    </p>
    <SectionNav previous={{ label: "Family Tree", slug: "projects/family-tree" }} next={{ label: "List Utilities & Custom Functions", slug: "projects/list-utils" }} />
  </div>
);

export default ProjectNondeterministicMathSection; 