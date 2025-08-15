import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { FaRocket, FaBook, FaCode, FaUsers, FaBrain, FaLightbulb, FaEdit } from "react-icons/fa";

// Index page with modern design
export default function Home() {
  return (
    <Layout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <div className="relative px-6 py-12 sm:px-8 sm:py-16 lg:py-20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-pink-600/10 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-6">
                <FaBrain className="h-4 w-4" />
                Next-Generation AI Programming Language
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Learn Symbolic & 
              <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Neuro-Symbolic Programming
              </span>
              with MeTTa
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Master the language of thought for AGI. Learn functional programming, knowledge graphs, 
              and self-modifying code through interactive examples and real-world projects.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/functional-programming" legacyBehavior>
                <a className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <FaRocket className="h-5 w-5" />
                  Start Learning
                </a>
              </Link>
              <Link href="/what-is-metta" legacyBehavior>
                <a className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <FaBook className="h-5 w-5" />
                  View Documentation
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="px-6 py-12 sm:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Why Learn MeTTa?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <FaBrain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Knowledge Graph Integration
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Work directly with rich knowledge graphs. Every piece of data and code is an atom in a unified hypergraph.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
                  <FaCode className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Self-Modifying Code
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Programs can introspect and modify themselves at runtime. Perfect for AI and meta-programming applications.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                  <FaLightbulb className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Multi-Paradigm Approach
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Combine functional, logical, and probabilistic programming in one language designed for AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-12 sm:px-8 bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800/50 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Ready to Get Started?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/projects/family-tree" legacyBehavior>
                <a className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Explore Examples</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">See MeTTa in action with real projects</p>
                    </div>
                  </div>
                </a>
              </Link>
              
              <Link href="/contribute" legacyBehavior>
                <a className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaEdit className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">Contribute</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Help others learn by creating content</p>
                    </div>
                  </div>
                </a>
              </Link>
              
              <a href="https://discord.gg/opencog" target="_blank" rel="noopener noreferrer" className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Join Community</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Connect with other MeTTa learners</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
