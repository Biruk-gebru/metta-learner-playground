import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaBars, FaTimes, FaBrain } from "react-icons/fa";

const chapters = [
  { label: "Functional Programming", slug: "functional-programming" },
  { label: "What is MeTTa?", slug: "what-is-metta" },
  { label: "Non-Determinism", slug: "nondeterminism" },
  { label: "Atomspace & Data Types", slug: "atomspace" },
  { label: "Standard Library", slug: "standard-library" },
  { label: "Recursion", slug: "recursion" },
  { label: "Best Practices", slug: "best-practices" },
  { label: "Installation", slug: "installation" },
];

const projects = [
  { label: "Family Tree", slug: "projects/family-tree" },
  { label: "Python & MeTTa Integration", slug: "projects/python-integration" },
  { label: "List Utilities & Custom Data Types", slug: "projects/list-utils" },
  { label: "Neuro-Symbolic", slug: "projects/neuro-symbolic" },
];

const extras = [
  { label: "Glossary", slug: "glossary" },
  { label: "References", slug: "references" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  
  const active = (slug: string) => router.asPath.includes(slug);
  
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-metta-darkText hover:text-metta-accent transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-metta-darkPanel border-r border-metta-darkPanel overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-metta-darkPanel">
              <div className="flex items-center gap-3">
                <FaBrain className="h-6 w-6 text-metta-accent" />
                <span className="font-bold text-xl text-metta-darkText">MeTTa Learner</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-metta-darkText hover:text-metta-accent transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-6">
              {/* Chapters */}
              <div>
                <div className="text-xs uppercase mb-3 tracking-wide text-metta-accent font-semibold">
                  Chapters
                </div>
                <div className="space-y-1">
                  {chapters.map((c) => (
                    <Link key={c.slug} href={`/${c.slug}`} legacyBehavior>
                      <a 
                        onClick={handleLinkClick}
                        className={`block px-3 py-2 rounded-lg transition font-medium ${
                          active(c.slug) 
                            ? 'bg-metta-accent text-metta-darkBg' 
                            : 'text-metta-darkText hover:bg-metta-accent/20'
                        }`}
                      >
                        {c.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="text-xs uppercase mb-3 tracking-wide text-metta-accent font-semibold">
                  Projects
                </div>
                <div className="space-y-1">
                  {projects.map((p) => (
                    <Link key={p.slug} href={`/${p.slug}`} legacyBehavior>
                      <a 
                        onClick={handleLinkClick}
                        className={`block px-3 py-2 rounded-lg transition font-medium ${
                          active(p.slug) 
                            ? 'bg-metta-accent text-metta-darkBg' 
                            : 'text-metta-darkText hover:bg-metta-accent/20'
                        }`}
                      >
                        {p.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other */}
              <div>
                <div className="text-xs uppercase mb-3 tracking-wide text-metta-accent font-semibold">
                  Other
                </div>
                <div className="space-y-1">
                  {extras.map((e) => (
                    <Link key={e.slug} href={`/${e.slug}`} legacyBehavior>
                      <a 
                        onClick={handleLinkClick}
                        className={`block px-3 py-2 rounded-lg transition font-medium ${
                          active(e.slug) 
                            ? 'bg-metta-accent text-metta-darkBg' 
                            : 'text-metta-darkText hover:bg-metta-accent/20'
                        }`}
                      >
                        {e.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu; 