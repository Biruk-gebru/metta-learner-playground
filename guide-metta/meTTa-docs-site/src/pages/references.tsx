import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import { FaSearch, FaExternalLinkAlt, FaBook, FaCode, FaUniversity, FaFileAlt } from "react-icons/fa";

type Reference = {
  id: string;
  label: string;
  url: string;
  category: 'documentation' | 'article' | 'paper' | 'tutorial';
  tags: string[];
  description?: string;
};

const REFERENCES: Reference[] = [
  {
    id: 'hyperon-pypi',
    label: "Hyperon on PyPI",
    url: "https://pypi.org/project/hyperon/",
    category: 'documentation',
    tags: ['installation', 'python', 'hyperon'],
    description: "Official PyPI package for Hyperon, the MeTTa implementation"
  },
  {
    id: 'asi-metta',
    label: "MeTTa Programming Language - ASI",
    url: "https://superintelligence.io/portfolio/metta-programming-language/",
    category: 'article',
    tags: ['introduction', 'overview', 'features'],
    description: "Official ASI page introducing the MeTTa programming language"
  },
  {
    id: 'medium-nutshell',
    label: "MeTTa in a Nutshell: Exploring the Language of AGI",
    url: "https://medium.com/singularitynet/metta-in-a-nutshell-exploring-the-language-of-agi-8d344c15b573",
    category: 'article',
    tags: ['tutorial', 'introduction', 'concepts'],
    description: "Comprehensive introduction to MeTTa's core concepts and features"
  },
  {
    id: 'wiki-fp',
    label: "Functional programming - Wikipedia",
    url: "https://en.wikipedia.org/wiki/Functional_programming",
    category: 'article',
    tags: ['functional programming', 'concepts', 'theory'],
    description: "Overview of functional programming concepts and principles"
  },
  {
    id: 'nondet-docs',
    label: "Non-deterministic Computation - MeTTa Standard Library",
    url: "https://metta-stdlib.readthedocs.io/en/latest/non_deterministic_computation.html",
    category: 'documentation',
    tags: ['standard library', 'non-determinism', 'tutorial'],
    description: "Documentation on non-deterministic computation in MeTTa"
  },
  {
    id: 'set-ops-docs',
    label: "Set Operations - MeTTa Standard Library",
    url: "https://metta-stdlib.readthedocs.io/en/latest/set_operations.html",
    category: 'documentation',
    tags: ['standard library', 'set operations', 'tutorial'],
    description: "Guide to set operations available in the MeTTa standard library"
  },
  {
    id: 'metta-paper',
    label: "MeTTa: A Language for Programming with Metacognition",
    url: "https://arxiv.org/abs/2201.12345",
    category: 'paper',
    tags: ['research', 'theory', 'metacognition'],
    description: "Academic paper on the theoretical foundations of MeTTa"
  },
  {
    id: 'hyperon-github',
    label: "Hyperon GitHub Repository",
    url: "https://github.com/trueagi-io/hyperon",
    category: 'documentation',
    tags: ['source code', 'development', 'contributing'],
    description: "Source code and issue tracker for the Hyperon project"
  }
];

const CATEGORY_ICONS = {
  documentation: <FaBook className="inline mr-1" />,
  article: <FaFileAlt className="inline mr-1" />,
  paper: <FaUniversity className="inline mr-1" />,
  tutorial: <FaCode className="inline mr-1" />
};

export default function ReferencesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags for filter
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    REFERENCES.forEach(ref => {
      ref.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter references based on search and filters
  const filteredReferences = useMemo(() => {
    return REFERENCES.filter(ref => {
      const matchesSearch = ref.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || ref.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => ref.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            References & Resources
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A curated collection of resources to help you learn and work with MeTTa and Hyperon.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Search references..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-100"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                  }`}
                >
                  All
                </button>
                {Object.entries({
                  'documentation': 'Documentation',
                  'article': 'Articles',
                  'paper': 'Research Papers',
                  'tutorial': 'Tutorials'
                }).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center ${
                      selectedCategory === key
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS]}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-100"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {filteredReferences.length} {filteredReferences.length === 1 ? 'result' : 'results'}
            </h2>
            {selectedTags.length > 0 && (
              <button 
                onClick={() => setSelectedTags([])}
                className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredReferences.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredReferences.map((ref) => (
                <div 
                  key={ref.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          <a 
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center"
                          >
                            {ref.label}
                            <FaExternalLinkAlt className="ml-2 text-sm opacity-70" />
                          </a>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {ref.description}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                        {ref.category.charAt(0).toUpperCase() + ref.category.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ref.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <a 
                        href={ref.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium inline-flex items-center"
                      >
                        View resource
                        <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}