import React from "react";
import dynamic from "next/dynamic";
import SectionNav from "../components/SectionNav";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const ProjectNeuroSymbolicSectionHeadings = [
  { id: "overview", title: "Overview & Project Idea", level: 1 },
  { id: "ai-types", title: "1. Symbolic, Sub-symbolic, and Neuro-Symbolic AI", level: 1 },
  { id: "symbolic", title: "2. Symbolic Reasoning (MeTTa/Hyperon)", level: 1 },
  { id: "neural", title: "3. Neural Reasoning (LLM)", level: 1 },
  { id: "integration", title: "4. Hybrid Reasoning & Integration", level: 1 },
  { id: "run-extend", title: "5. How to Run or Extend This Project", level: 1 },
];

const ProjectNeuroSymbolicSection = () => (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-100 bg-slate-900 rounded-2xl shadow">
    <h1 className="text-3xl font-bold mb-6">Project 4: Neuro-Symbolic AI Assistant (Backend)</h1>

    <h2 id="overview" className="text-2xl font-semibold mt-8 mb-2">Overview & Project Idea</h2>
    <p>
      This project demonstrates a backend for a <b>Neuro-Symbolic AI Assistant</b>—a system that combines symbolic reasoning (using MeTTa/Hyperon) with neural (LLM, e.g., Google Gemini) reasoning. The backend decides which engine to use for each user query and can even combine both for hybrid explanations.
    </p>

    <h2 id="ai-types" className="text-2xl font-semibold mt-8 mb-2">1. Symbolic, Sub-symbolic, and Neuro-Symbolic AI</h2>
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li><b>Symbolic AI:</b> Uses explicit facts and rules (e.g., MeTTa code) to perform logical inference. Example: Given facts about symptoms and rules for diseases, deduce a diagnosis.</li>
      <li><b>Sub-symbolic AI (Neural/LLM):</b> Uses neural networks (like Gemini, GPT) to answer open-ended or ambiguous questions. Example: Summarize a patient’s history or answer “What is the meaning of life?”</li>
      <li><b>Neuro-symbolic AI:</b> Combines both: uses symbolic reasoning for logic/structure, neural models for perception and flexible learning. This project’s backend chooses the best engine for each question, or combines both for richer answers.</li>
    </ul>

    <h2 id="symbolic" className="text-2xl font-semibold mt-8 mb-2">2. Symbolic Reasoning (MeTTa/Hyperon)</h2>
    <p>
      Facts and rules are stored in <code>.metta</code> files (e.g., <code>main.metta</code>, <code>Facts.metta</code>, <code>Rules.metta</code>). The backend loads these and uses the <code>hyperon</code> Python API to run queries.
    </p>
    <CodeEditor language="metta" initialCode={`(: fever-rule
   (-> (has_fever $x)
       (-> (has_chills $x)
           ($x has_fever_condition)
       )
   )
)`} />
    <p className="mb-4">
      This rule says: If someone has a fever and chills, they have a fever condition.
    </p>
    <CodeEditor language="python" initialCode={`from hyperon import MeTTa
metta = MeTTa()
with open("./main.metta") as f:
    full_code = f.read()
result = metta.run(full_code + "\n!(has_fever_condition John)")
print(result)`} />
    <p className="mb-6">
      Loads all facts/rules and queries if John has a fever condition.
    </p>

    <h2 id="neural" className="text-2xl font-semibold mt-8 mb-2">3. Neural Reasoning (LLM)</h2>
    <p>
      The backend uses Google Gemini (or any LLM) for open-ended or ambiguous questions. The LLM is called via API, and the answer is returned as JSON.
    </p>
    <CodeEditor language="python" initialCode={`import google.generativeai as genai
genai.configure(api_key=GEMINI_API_KEY)
response = genai.generate_text("Summarize the patient's history.")
print(response)`} />
    <p className="mb-6">
      The LLM answers questions that are not easily handled by symbolic logic.
    </p>

    <h2 id="integration" className="text-2xl font-semibold mt-8 mb-2">4. Hybrid Reasoning & Integration</h2>
    <p>
      The backend uses a prompt to decide: Should the question be answered by symbolic (backward/forward chaining) or neural reasoning? If symbolic, it formats the query for MeTTa. If neural, it sends the question to the LLM. The result is returned to the user, along with the reasoning type and a human-friendly explanation.
    </p>
    <CodeEditor language="python" initialCode={`@app.route('/ask', methods=['POST'])
def ask():
    user_query = request.json['user_query']
    # 1. Use LLM to decide reasoning type and format query
    reasoning_info = get_llm_reasoning_type_and_query(user_query)
    reasoning_type = reasoning_info['reasoning_type']
    query = reasoning_info['query']

    if reasoning_type in ['backward', 'forward']:
        symbolic_result = askmetta(query)
        answer, reasoning = explain_symbolic_reasoning(symbolic_result, reasoning_type, user_query)
        return jsonify({'answer': answer, 'reasoning': reasoning, 'type': 'symbolic'})
    else:
        answer, reasoning = get_llm_answer_and_reasoning(user_query)
        return jsonify({'answer': answer, 'reasoning': reasoning, 'type': 'neural'})`} />
    <p className="mb-6">
      This function receives a user question, uses the LLM to decide which engine to use, runs the query in MeTTa or the LLM, and returns the answer and reasoning.
    </p>

    <h2 id="run-extend" className="text-2xl font-semibold mt-8 mb-2">5. How to Run or Extend This Project</h2>
    <ul className="mb-6 mt-4 list-disc pl-6">
      <li>All backend code is in <code>Neuro-Symbolic-AI/Backend/</code>.</li>
      <li>Facts and rules are in <code>.metta</code> files.</li>
      <li>The backend is a Flask app that exposes an <code>/ask</code> endpoint for questions.</li>
      <li>You can extend the system by adding new rules, facts, or integrating other LLMs.</li>
    </ul>
    <CodeEditor language="python" initialCode={`# Install requirements
pip install -r requirements.txt

# Set up your Gemini (or other LLM) API key
export GEMINI_API_KEY=your_key_here

# Run the Flask app
python app.py

# Send POST requests to /ask with a JSON body:
# { "user_query": "Why does the frog croak?" }`} />
    <p className="mb-6">
      For a full working example, see the <a href="https://github.com/yonayetol/Neuro-Symbolic-AI" target="_blank" rel="noopener noreferrer" className="underline text-metta-accent">Neuro-Symbolic-AI on GitHub</a>.
    </p>
    <SectionNav previous={{ label: "List Utilities & Custom Functions", slug: "projects/list-utils" }} next={null} />
  </div>
);

export default ProjectNeuroSymbolicSection; 