import React from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import { MobileTableOfContents } from "./MobileTableOfContents";
import Link from "next/link";
import { FaBrain, FaGithub, FaDiscord, FaEdit } from "react-icons/fa";
import { TableOfContents } from "./TableOfContents";
import { extractHeadingsFromChildren } from "./extractHeadings";

interface LayoutProps {
  children: React.ReactNode;
  headings?: any;
  showEditButton?: boolean;
  onEditClick?: () => void;
  pageTitle?: string;
}

const Layout = ({ children, headings: headingsProp, showEditButton = false, onEditClick, pageTitle }: LayoutProps) => {
  const headings = headingsProp || extractHeadingsFromChildren(children);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      {/* Top nav bar/header */}
      <header className="fixed top-0 left-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 min-w-max">
            <div className="relative">
              <FaBrain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="absolute -inset-1 bg-purple-600/20 rounded-full blur-sm"></div>
            </div>
            <Link href="/" className="font-bold text-xl relative group">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                MeTTa Learner
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/functional-programming" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              Learn
            </Link>
            <Link href="/glossary" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              Glossary
            </Link>
            <Link href="/references" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              References
            </Link>
            <Link href="/projects/family-tree" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              Projects
            </Link>
            <Link href="/contribute" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              Contribute
            </Link>
            <a href="https://community.singularitynet.io/" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors">
              Forum
            </a>
            <a href="https://github.com/Biruk-gebru/metta-learner-playground" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="https://discord.com/invite/snet" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <FaDiscord className="h-5 w-5" />
            </a>
          </nav>
          
          <MobileMenu />
        </div>
      </header>
      
      <div className="flex flex-1 pt-20">
        {/* Left sidebar - hidden on mobile; sticky and scrollable */}
        <aside className="hidden lg:block w-64 min-w-64 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-r border-slate-200/50 dark:border-slate-700/50 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden">
          <Sidebar dark={true} />
        </aside>
        
        <main className="flex-1 flex justify-center items-start overflow-y-auto">
          <div className="max-w-4xl w-full p-4 sm:p-6 lg:p-8">
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden relative">
              {/* Edit Page Button - Temporarily hidden */}
              {/* {showEditButton && onEditClick && (
                <button
                  onClick={onEditClick}
                  className="absolute top-4 right-4 z-10 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-lg"
                  title={`Edit ${pageTitle || 'this page'}`}
                >
                  <FaEdit className="h-4 w-4" />
                  Edit Page
                </button>
              )} */}
              {children}
            </div>
          </div>
        </main>
        
        {/* Table of contents - hidden on mobile */}
        <aside className="hidden xl:block w-80 min-w-80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-l border-slate-200/50 dark:border-slate-700/50 p-6">
          <TableOfContents headings={headings} />
        </aside>
      </div>
      
      {/* Mobile Table of Contents */}
      <MobileTableOfContents headings={headings} />
      
      <footer className="w-full text-center py-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-semibold">
            Made by
            {' '}
            <a href="https://github.com/Biruk-gebru" target="_blank" rel="noopener noreferrer" className="inline-block px-2 py-0.5 ml-1 rounded bg-purple-100/60 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 hover:underline">
              Biruk Gebru Jember (@Biruk-gebru)
            </a>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
            Learn Symbolic & Neuro-Symbolic Programming with MeTTa
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
