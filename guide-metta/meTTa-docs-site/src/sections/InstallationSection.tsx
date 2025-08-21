import React from "react";
import SectionNav, { getNavigationItems } from "../components/SectionNav";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("../components/CodeEditor"), { ssr: false });

export const InstallationSectionHeadings = [
  { id: "installation-and-setup", title: "Installation and Setup", level: 1 },
  { id: "using-metta-from-python", title: "Using MeTTa from Python", level: 2 },
];

const InstallationSection = () => {
  const navigation = getNavigationItems("installation");
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 id="installation-and-setup" className="text-3xl font-bold mb-4">Installation and Setup</h1>
    <p className="mb-4">
      MeTTa comes bundled with Hyperon. To install locally, ensure you have Python 3.8+ and use pip:
    </p>
    <div className="relative my-6">
      <div className="flex items-center justify-between bg-metta-lightPanel dark:bg-metta-darkPanel px-3 py-2 rounded-t-md border-b">
        <span className="text-xs font-bold uppercase tracking-wider text-metta-accent">shell</span>
        <button
          className="px-2 py-1 rounded text-xs border hover:bg-metta-accent/10"
          onClick={() => navigator.clipboard.writeText('pip install hyperon')}
          aria-label="Copy command"
        >
          Copy
        </button>
      </div>
      <pre className="bg-slate-100 dark:bg-slate-900 rounded-b-md p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-100 font-mono border-none" style={{ margin: 0 }}>
        <code>pip install hyperon</code>
      </pre>
    </div>
    <p className="mb-4">
      This installs the <code>hyperon</code> Python package (which includes MeTTa). It adds a command-line tool <code>metta</code>. You can run a MeTTa program file like:
    </p>
    <div className="relative my-6">
      <div className="flex items-center justify-between bg-metta-lightPanel dark:bg-metta-darkPanel px-3 py-2 rounded-t-md border-b">
        <span className="text-xs font-bold uppercase tracking-wider text-metta-accent">shell</span>
        <button
          className="px-2 py-1 rounded text-xs border hover:bg-metta-accent/10"
          onClick={() => navigator.clipboard.writeText('metta myprogram.metta')}
          aria-label="Copy command"
        >
          Copy
        </button>
      </div>
      <pre className="bg-slate-100 dark:bg-slate-900 rounded-b-md p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-100 font-mono border-none" style={{ margin: 0 }}>
        <code>metta myprogram.metta</code>
      </pre>
    </div>
    <p className="mb-4">
      This will load <code>myprogram.metta</code> and evaluate any expressions it contains. For example, if <code>myprogram.metta</code> defines <code>(= (foo) 42)</code>, then invoking <code>metta myprogram.metta !(foo)</code> will print <code>42</code>.
    </p>
    <p className="mb-4">
      Behind the scenes, Hyperon is still in pre-alpha, but works on all major platforms. For advanced use (or contributing), check the Hyperon GitHub and documentation for any platform-specific notes.
    </p>
    <h2 id="using-metta-from-python" className="text-2xl font-semibold mt-8 mb-2">Using MeTTa from Python</h2>
    <p className="mb-4">
      Since Hyperon is a Python library, you can embed MeTTa inside Python code. For example:
    </p>
    <CodeEditor initialCode={`from hyperon import MeTTa

def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

mt = MeTTa()
mt.register_atom("fib", fib)
mt.run('(= (fib-wrapper $n) (call-py fib $n))')
result = mt.run('(fib-wrapper 6)')

# Extract the integer value from the result Atom, if needed
if result:
    print(result[0].get_value())  # Should print 8
else:
    print("No result")`} language="python" />
    <p className="mb-4">
      This shows how you can define MeTTa rules, register Python functions as callable, and evaluate MeTTa functions. The <code>Atom</code> class wraps values. You can also add atoms, query, and manipulate the Atomspace from Python.
    </p>
    <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-xl text-indigo-900 dark:text-indigo-200">
      <b>For more details, see the MeTTa tutorials (e.g. the Metta training repository) and the Hyperon documentation.</b>
    </div>
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">References & Further Resources</h3>
      <ul className="list-disc pl-6 text-sm">
        <li>
          <a href="https://www.youtube.com/@BeyondTheCode_AI_" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
            Beyond The Code AI — YouTube Channel (MeTTa tutorials, guides, and more)
          </a>
        </li>
      </ul>
    </div>
    <SectionNav previous={navigation.previous} next={navigation.next} />
    </div>
  );
};

export default InstallationSection; 