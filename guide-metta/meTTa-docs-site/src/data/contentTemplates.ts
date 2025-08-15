import { ContentTemplate } from '../types/content';

export const contentTemplates: ContentTemplate[] = [
  {
    id: 'functional-programming',
    title: 'Functional Programming Tutorial',
    description: "Create a tutorial about functional programming concepts in MeTTa",
    category: 'tutorial',
    template: `<div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-sm sm:text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Tutorial Title</h1>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Introduction</h2>
  <p className="mb-4">
    Write your introduction here. Explain what this tutorial will cover and why it's important.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Key Concepts</h2>
  <p className="mb-4">
    Explain the main concepts that will be covered in this tutorial.
  </p>
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Example 1</h3>
  <p className="mb-4">
    Provide your first example with explanation.
  </p>
  
  <CodeEditor initialCode={'!(+ 2 3)\n; This adds 2 and 3'} language="metta" />
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Example 2</h3>
  <p className="mb-4">
    Provide your second example with explanation.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Summary</h2>
  <p className="mb-4">
    Summarize what was learned and provide next steps.
  </p>
</div>`
  },
  {
    id: 'project-example',
    title: 'Project Example',
    description: 'Create a practical project that demonstrates MeTTa concepts',
    category: 'project',
    template: `<div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-sm sm:text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Project: Your Project Name</h1>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Project Overview</h2>
  <p className="mb-4">
    Describe what this project does and what concepts it demonstrates.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Requirements</h2>
  <ul className="list-disc pl-6 mb-4">
    <li>Requirement 1</li>
    <li>Requirement 2</li>
    <li>Requirement 3</li>
  </ul>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Implementation</h2>
  <p className="mb-4">
    Explain the implementation step by step.
  </p>
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Step 1: Setup</h3>
  <CodeEditor initialCode={'; Your MeTTa code here\n!(define $x 5)'} language="metta" />
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Step 2: Core Logic</h3>
  <CodeEditor initialCode={'; More MeTTa code\n!(+ $x 3)'} language="metta" />
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Testing</h2>
  <p className="mb-4">
    Show how to test the project and expected outputs.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Conclusion</h2>
  <p className="mb-4">
    Wrap up the project and suggest improvements or extensions.
  </p>
</div>`
  },
  {
    id: 'reference-guide',
    title: 'Reference Guide',
    description: 'Create a reference guide for MeTTa functions or concepts',
    category: 'reference',
    template: `<div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-sm sm:text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
  <h1 className="text-2xl sm:text-3xl font-bold mb-4">Reference: Your Topic</h1>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Overview</h2>
  <p className="mb-4">
    Provide a brief overview of the topic or function being documented.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Syntax</h2>
  <p className="mb-4">
    Show the syntax and parameters.
  </p>
  
  <CodeEditor initialCode={'; Syntax example\n(function-name param1 param2)'} language="metta" />
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Parameters</h2>
  <ul className="list-disc pl-6 mb-4">
    <li><strong>param1:</strong> Description of parameter 1</li>
    <li><strong>param2:</strong> Description of parameter 2</li>
  </ul>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Examples</h2>
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Basic Example</h3>
  <CodeEditor initialCode={'; Basic usage example\n!(function-name 1 2)'} language="metta" />
  
  <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2">Advanced Example</h3>
  <CodeEditor initialCode={'; Advanced usage example\n!(function-name $x $y)'} language="metta" />
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Common Patterns</h2>
  <p className="mb-4">
    Show common usage patterns and best practices.
  </p>
  
  <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-2">Related Functions</h2>
  <p className="mb-4">
    List related functions or concepts that readers might find useful.
  </p>
</div>`
  }
];

export default contentTemplates;
