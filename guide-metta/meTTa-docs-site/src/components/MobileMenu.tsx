import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars, FaTimes, FaBook, FaCode, FaRocket, FaCog, FaQuestionCircle, FaLightbulb, FaProjectDiagram, FaBrain, FaUsers, FaGithub, FaDiscord, FaList, FaBookOpen } from "react-icons/fa";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    {
      title: "Getting Started",
      items: [
        { label: "Installation", href: "/installation", icon: FaCog },
        { label: "What is MeTTa?", href: "/what-is-metta", icon: FaQuestionCircle },
        { label: "Functional Programming", href: "/functional-programming", icon: FaRocket },
      ]
    },
    {
      title: "Core Concepts",
      items: [
        { label: "Atomspace", href: "/atomspace", icon: FaBrain },
        { label: "Non-Determinism", href: "/nondeterminism", icon: FaLightbulb },
        { label: "Recursion", href: "/recursion", icon: FaCode },
        { label: "Standard Library", href: "/standard-library", icon: FaBook },
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Glossary", href: "/glossary", icon: FaBookOpen },
        { label: "References", href: "/references", icon: FaList },
      ]
    },
    {
      title: "Projects",
      items: [
        { label: "Family Tree", href: "/projects/family-tree", icon: FaProjectDiagram },
        { label: "Python Integration", href: "/projects/python-integration", icon: FaCode },
        { label: "Neuro-Symbolic", href: "/projects/neuro-symbolic", icon: FaBrain },
        { label: "List Utils", href: "/projects/list-utils", icon: FaCode },
      ]
    }
  ];

  const isActive = (href: string) => {
    return router.pathname === href || router.asPath.startsWith(href);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-700/50 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? (
          <FaTimes className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        ) : (
          <FaBars className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        )}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-l border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <FaTimes className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="space-y-6">
                  {navigation.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                        {section.title}
                      </h3>
                      <ul className="space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const active = isActive(item.href);
                          
                          return (
                            <li key={item.href}>
                              <Link href={item.href} legacyBehavior>
                                <a 
                                  onClick={handleLinkClick}
                                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    active
                                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                                      : 'text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400'
                                  }`}
                                >
                                  <Icon className={`h-4 w-4 ${
                                    active ? 'text-white' : 'text-slate-400 group-hover:text-purple-500'
                                  }`} />
                                  {item.label}
                                  {active && (
                                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                  <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link href="/contribute" legacyBehavior>
                      <a 
                        onClick={handleLinkClick}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                      >
                        <FaCode className="h-4 w-4 text-slate-400" />
                        Contribute Content
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href="https://github.com/Biruk-gebru/metta-learner-playground" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FaGithub className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                  <a 
                    href="https://discord.com/invite/snet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FaDiscord className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                  <a 
                    href="https://community.singularitynet.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <FaBookOpen className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                </div>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">
                  MeTTa Learner
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu; 