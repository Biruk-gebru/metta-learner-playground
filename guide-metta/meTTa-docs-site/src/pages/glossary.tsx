import React, { useState, useMemo } from "react";
import { FaSearch, FaBook, FaExternalLinkAlt } from "react-icons/fa";
import Layout from "../components/Layout";

const GLOSSARY = [
  { 
    term: "Atom", 
    category: "Core Concept",
    def: "The fundamental unit of knowledge in MeTTa, representing data, code, or relationships. Atoms are the building blocks of the Atomspace.",
    related: ["Atomspace", "Grounded Atom"]
  },
  { 
    term: "Atomspace", 
    category: "Core Concept",
    def: "A hypergraph database that stores and manages atoms. It serves as the foundation for knowledge representation and reasoning in MeTTa.",
    related: ["Atom", "Hypergraph"]
  },
  { 
    term: "Collapse", 
    category: "Operation",
    def: "A MeTTa operation that collects all possible results from a nondeterministic computation into a single tuple.",
    example: "!(collapse (ancestor John $who))"
  },
  { 
    term: "Grounded Atom", 
    category: "Type",
    def: "An atom that is connected to external code or data, allowing MeTTa to interface with other programming languages and systems.",
    related: ["Grounded Function"]
  },
  { 
    term: "MeTTa", 
    category: "Language",
    def: "Meta Type Talk, the core programming language of OpenCog Hyperon, designed for symbolic AI and cognitive architecture.",
    related: ["Hyperon", "Atomspace"]
  },
  { 
    term: "Rule", 
    category: "Concept",
    def: "A pattern-based definition that specifies how to transform or match expressions in MeTTa, typically using the '=' operator.",
    example: "(= (factorial 0) 1)"
  },
  { 
    term: "Variable", 
    category: "Syntax",
    def: "A placeholder (prefixed with $) that can match any term in pattern matching or represent unknown values in rules.",
    example: "$x, $name, $result"
  },
  { 
    term: "Pattern Matching", 
    category: "Operation",
    def: "The process of comparing a pattern against expressions to find matches, possibly with variable bindings.",
    related: ["Unification"]
  },
  { 
    term: "Unification", 
    category: "Operation",
    def: "The process of making two expressions identical by finding appropriate substitutions for their variables.",
    related: ["Pattern Matching", "Variable"]
  },
  { 
    term: "Hyperon", 
    category: "Framework",
    def: "The next-generation cognitive architecture that includes MeTTa as its core language, focusing on AGI development.",
    related: ["MeTTa", "Atomspace"]
  },
  { 
    term: "Type System", 
    category: "Concept",
    def: "MeTTa's mechanism for classifying and constraining terms, supporting both static and dynamic typing.",
    related: ["Type Inference"]
  },
  { 
    term: "Type Inference", 
    category: "Feature",
    def: "The automatic detection of the type of an expression in MeTTa, reducing the need for explicit type annotations.",
    example: ";; Type annotation: (: add (-> Number Number Number))"
  }
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(GLOSSARY.map(item => item.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const filteredTerms = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return GLOSSARY.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchLower) || 
                          item.def.toLowerCase().includes(searchLower);
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            MeTTa Language Glossary
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore key terms and concepts in the MeTTa programming language
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search terms and definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <FaBook className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No terms found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredTerms.map((item) => (
                <div 
                  key={item.term}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {item.term}
                        </h3>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {item.def}
                    </p>

                    {item.example && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                          {item.example}
                        </code>
                      </div>
                    )}

                    {item.related && item.related.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                          Related Terms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {item.related.map(term => (
                            <span 
                              key={term}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            >
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Can't find what you're looking for? </p>
          <a 
            href="https://github.com/opencog/metta/issues/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline"
          >
            Suggest a new term <FaExternalLinkAlt className="ml-1 h-3 w-3" />
          </a>
        </div>
      </div>
    </Layout>
  );
}