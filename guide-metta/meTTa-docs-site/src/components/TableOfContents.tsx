import React, { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

export interface TOCHeading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Handle initial hash in URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView();
          setActiveId(id);
        }, 100);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);
            // Update URL without page reload
            window.history.replaceState({}, '', `#${id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    const elements = headings.map(heading => document.getElementById(heading.id)).filter(Boolean);
    elements.forEach(element => element && observer.observe(element));

    return () => {
      elements.forEach(element => element && observer.unobserve(element));
    };
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Update URL without page reload
      window.history.pushState({}, '', `#${id}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update active ID for highlighting
      setActiveId(id);
    }
  }, []);

  const toggleSection = (headingId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(headingId)) {
      newExpanded.delete(headingId);
    } else {
      newExpanded.add(headingId);
    }
    setExpandedSections(newExpanded);
  };

  const getIndentLevel = (level: number) => {
    return (level - 1) * 16; // 16px per level
  };

  const getHeadingIcon = (level: number) => {
    switch (level) {
      case 1: return "🔷";
      case 2: return "🔸";
      case 3: return "▪️";
      default: return "▫️";
    }
  };

  return (
    <div className="sticky top-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Table of Contents
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
      </div>

      <nav className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const hasChildren = headings.some(h => h.level > heading.level && h.level <= heading.level + 1);
          const isExpanded = expandedSections.has(heading.id);
          
          return (
            <div key={heading.id}>
              <div className="flex items-center">
                <Link 
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(heading.id);
                  }}
                  className={`flex-1 text-left group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                  style={{ paddingLeft: `${12 + getIndentLevel(heading.level)}px` }}
                >
                  <span className="text-xs opacity-70">{getHeadingIcon(heading.level)}</span>
                  <span className={`text-sm font-medium truncate ${
                    heading.level === 1 ? 'font-semibold' : 'font-normal'
                  }`}>
                    {heading.title}
                  </span>
                </Link>
                
                {hasChildren && (
                  <button
                    onClick={() => toggleSection(heading.id)}
                    className={`p-1 rounded transition-colors ${
                      isActive ? 'text-white hover:bg-white/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    {isExpanded ? (
                      <FaChevronDown className="h-3 w-3" />
                    ) : (
                      <FaChevronRight className="h-3 w-3" />
                    )}
                  </button>
                )}
              </div>

              {/* Show children if expanded */}
              {hasChildren && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {headings
                    .filter(h => h.level > heading.level && h.level <= heading.level + 1)
                    .map((child) => {
                      const isChildActive = activeId === child.id;
                      return (
                        <Link 
                          href={`#${child.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleClick(child.id);
                          }}
                          className={`block py-1 px-2 rounded transition-colors text-sm ${
                            activeId === child.id
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                          style={{ paddingLeft: `${12 + getIndentLevel(child.level)}px` }}
                        >
                          <span className="text-xs opacity-50">{getHeadingIcon(child.level)}</span>
                          <span className="text-xs truncate">{child.title}</span>
                        </Link>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <div className="flex justify-between items-center">
            <span>Sections:</span>
            <span className="font-medium">{headings.length}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span>Reading time:</span>
            <span className="font-medium">~{Math.ceil(headings.length * 2)} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 