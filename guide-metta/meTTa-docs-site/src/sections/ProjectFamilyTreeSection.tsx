import React from "react";
import dynamic from "next/dynamic";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });
const MermaidRenderer = dynamic(() => import("../components/MermaidRenderer"), { ssr: false });

export const ProjectFamilyTreeSectionHeadings = [
  { id: "populate-atomspace", title: "1. Populate the Atomspace (Facts)", level: 1 },
  { id: "helper-functions", title: "2. Helper Functions", level: 1 },
  { id: "query-examples", title: "3. Query Examples", level: 1 },
  { id: "full-code-block", title: "4. Full Code Block", level: 1 },
];

const ProjectFamilyTreeSection = () => {
  const navigation = getNavigationItems("projects/family-tree");
  
  return (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-100 bg-slate-900 rounded-2xl shadow">
    <h1 className="text-3xl font-bold mb-6">Project 1: Family Heritage Tracker</h1>

    <h2 id="populate-atomspace" className="text-2xl font-semibold mt-8 mb-2">1. Populate the Atomspace (Facts)</h2>
    <p>
      We start by encoding the family tree as facts in the Atomspace. Each person is assigned a gender, and parent-child relationships are defined. This forms the base data for all queries and reasoning.
    </p>
    <CodeEditor language="metta" initialCode={`(gender Chandler M)
(gender John M)
(gender Adam M)
(gender Bob M)
(gender Tim M)
(gender Joey M)

(gender Monica F)
(gender Jane F)
(gender Pam F)
(gender Kim F)
(gender Eve F)
(is-parent Chandler John)
(is-parent Chandler Pam)
(is-parent Chandler Adam)
(is-parent Chandler Jane)
(is-parent Monica John)
(is-parent Monica Pam)
(is-parent Monica Adam)
(is-parent Monica Jane)
(is-parent John Bob)
(is-parent Pam Tim)
(is-parent Pam Kim)
(is-parent Adam Eve)
(is-parent Jane Joey)`} />
    <p className="mb-6">
      <b>Why?</b> These facts allow us to answer questions about family structure, such as who is a parent, sibling, uncle, etc. The <code>gender</code> facts are needed for queries like "who is a mother" or "who is an uncle".
    </p>

    <h2 id="helper-functions" className="text-2xl font-semibold mt-8 mb-2">2. Helper Functions</h2>
    <p>
      To answer complex family questions, we define helper functions. These use pattern matching, logic, and recursion to traverse the Atomspace. Each function is explained below:
    </p>
    <CodeEditor language="metta" initialCode={`(= (is-male $person)
    (match &self (gender $person $g) (if (== $g M) True False))
)

(= (get-parents $child)
    (match &self (is-parent $parent $child) $parent)
)

(= (is-child $parent)
    (let $child (match &self (is-parent $parent $child) $child) $child)
)

(= (is-mother $child)
    (let* 
    (
        ($p (get-parents $child))
    )
    (if (is-male $p) (empty) $p))
)

(= (is-sibling $child)
    (let $r (collapse (let* (
        ($p1 (get-parents $child))      
        ($siblings (is-child $p1)) ; Ensure output is a list
    )
    (if (== $siblings $child) (empty) $siblings)
    ))
    (unique (superpose $r)) 
    )
)

(= (filter-males $list)
    (filter-atom (superpose $list) (lambda ($person) (is-male $person)))
)

(= (is-uncle $child)
    (let* (
        ($parents (get-parents $child))  
        ($siblings (is-sibling $parents))  
        ($uncles (if (is-male $siblings) $siblings (empty)))  ; Filter uncles
    )
    $uncles
    )
)

(= (is-nephew $uncle)
     (let* (
            ($siblings (is-sibling $uncle))
            ($nephews (is-child $siblings))  ; Filter nephews
            ($nephew (if (is-male $nephews) $nephews (empty)))  ; Filter nephews
        )
        $nephew
        )
)

(= (ancestor-helper $list)
    (collapse $list)
)

(= (ancestor $child $acc)
    (let*
        (
            ($a (collapse (get-parents $child)))
            ($carry (union-atom $acc $a))
        ) 
        (if (== $a ())
            $carry
            (ancestor (superpose $a) $carry)
        )
    )
)`} />
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li><b>is-male:</b> Checks if a person is male by matching their gender.</li>
      <li><b>get-parents:</b> Finds all parents of a given child.</li>
      <li><b>is-child:</b> Lists all children of a parent.</li>
      <li><b>is-mother:</b> Returns the mother of a child (a parent who is not male).</li>
      <li><b>is-sibling:</b> Finds all siblings of a child (other children of the same parents).</li>
      <li><b>filter-males:</b> Filters a list to only include males.</li>
      <li><b>is-uncle:</b> Finds all uncles of a child (male siblings of the parents).</li>
      <li><b>is-nephew:</b> Finds all nephews of a person (male children of their siblings).</li>
      <li><b>ancestor-helper, ancestor:</b> Recursively finds all ancestors of a person using an accumulator.</li>
    </ul>
    <p>
      <b>Why helpers?</b> These helpers break down complex family relationships into smaller, reusable logic. Pattern matching and recursion allow us to traverse the family tree and answer questions that would be hard to express in a single rule.
    </p>

    <h2 id="query-examples" className="text-2xl font-semibold mt-8 mb-2">3. Query Examples</h2>
    <p>
      Here are some example queries you can run, with explanations of what each does and which helpers are used:
    </p>
    <CodeEditor language="metta" initialCode={`! (get-parents (get-parents Bob)) ; Get the grandparents of Bob
! (is-mother Bob) ; Who is Bob's mother?
! (is-child Monica) ; List Monica's children
! (is-sibling John) ; List John's siblings
! (is-uncle Bob) ; List Bob's uncles
! (is-nephew Pam) ; List Pam's nephews
! (let $n (collapse (ancestor Bob ())) (unique (superpose $n))) ; List all ancestors of Bob
`} />
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li><b>get-parents (get-parents Bob):</b> Finds Bob's grandparents by first finding his parents, then their parents.</li>
      <li><b>is-mother Bob:</b> Returns Bob's mother by filtering his parents for a non-male.</li>
      <li><b>is-child Monica:</b> Lists all children of Monica.</li>
      <li><b>is-sibling John:</b> Lists all siblings of John.</li>
      <li><b>is-uncle Bob:</b> Lists all uncles of Bob (male siblings of his parents).</li>
      <li><b>is-nephew Pam:</b> Lists all nephews of Pam (male children of her siblings).</li>
      <li><b>ancestor Bob:</b> Recursively finds all ancestors of Bob using the <code>ancestor</code> helper.</li>
    </ul>

    <h2 id="full-code-block" className="text-2xl font-semibold mt-8 mb-2">4. Full Code Block</h2>
    <p>
      Here is the complete code for this project. You can copy and run it in your MeTTa environment to experiment with the family tree and queries:
    </p>
    <CodeEditor language="metta" initialCode={`(gender Chandler M)
(gender John M)
(gender Adam M)
(gender Bob M)
(gender Tim M)
(gender Joey M)

(gender Monica F)
(gender Jane F)
(gender Pam F)
(gender Kim F)
(gender Eve F)
(is-parent Chandler John)
(is-parent Chandler Pam)
(is-parent Chandler Adam)
(is-parent Chandler Jane)
(is-parent Monica John)
(is-parent Monica Pam)
(is-parent Monica Adam)
(is-parent Monica Jane)
(is-parent John Bob)
(is-parent Pam Tim)
(is-parent Pam Kim)
(is-parent Adam Eve)
(is-parent Jane Joey)

(= (is-male $person)
    (match &self (gender $person $g) (if (== $g M) True False))
)

(= (get-parents $child)
    (match &self (is-parent $parent $child) $parent)
)

(= (is-child $parent)
    (let $child (match &self (is-parent $parent $child) $child) $child)
)

(= (is-mother $child)
    (let* 
    (
        ($p (get-parents $child))
    )
    (if (is-male $p) (empty) $p))
)

(= (is-sibling $child)
    (let $r (collapse (let* (
        ($p1 (get-parents $child))      
        ($siblings (is-child $p1)) ; Ensure output is a list
    )
    (if (== $siblings $child) (empty) $siblings)
    ))
    (unique (superpose $r)) 
    )
)

(= (filter-males $list)
    (filter-atom (superpose $list) (lambda ($person) (is-male $person)))
)

(= (is-uncle $child)
    (let* (
        ($parents (get-parents $child))  
        ($siblings (is-sibling $parents))  
        ($uncles (if (is-male $siblings) $siblings (empty)))  ; Filter uncles
    )
    $uncles
    )
)

(= (is-nephew $uncle)
     (let* (
            ($siblings (is-sibling $uncle))
            ($nephews (is-child $siblings))  ; Filter nephews
            ($nephew (if (is-male $nephews) $nephews (empty)))  ; Filter nephews
        )
        $nephew
        )
)

(= (ancestor-helper $list)
    (collapse $list)
)

(= (ancestor $child $acc)
    (let*
        (
            ($a (collapse (get-parents $child)))
            ($carry (union-atom $acc $a))
        ) 
        (if (== $a ())
            $carry
            (ancestor (superpose $a) $carry)
        )
    )
)

! (get-parents (get-parents Bob))
! (is-mother Bob)
! (is-child Monica)
! (is-sibling John)
!(is-uncle Bob)
!(is-nephew Pam)
! (let $n (collapse (ancestor Bob ())) (unique (superpose $n)))
`} />
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default ProjectFamilyTreeSection; 