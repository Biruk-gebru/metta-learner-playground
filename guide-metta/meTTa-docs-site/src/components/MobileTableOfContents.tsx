import React, { useState, useEffect } from "react";
import { FaList, FaTimes } from "react-icons/fa";
import type { TOCHeading } from "./TableOfContents";

interface MobileTableOfContentsProps {
  headings: TOCHeading[];
}

export function MobileTableOfContents({ headings }: MobileTableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headingsEls = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const scrollPosition = window.scrollY;
      let currentSection = "";

      headingsEls.forEach((heading) => {
        const top = heading.getBoundingClientRect().top + window.scrollY - 100;
        if (scrollPosition >= top) {
          currentSection = heading.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  if (headings.length === 0) return null;

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-40 bg-metta-accent text-white p-3 rounded-full shadow-lg hover:bg-metta-accent/80 transition-colors"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <FaTimes className="h-5 w-5" /> : <FaList className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed bottom-4 right-4 w-80 max-w-[85vw] max-h-[70vh] bg-metta-darkPanel rounded-2xl shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-metta-darkPanel">
              <h3 className="font-bold text-base text-metta-accent">Table of Contents</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-metta-darkText hover:text-metta-accent transition-colors"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(70vh - 80px)" }}>
              <ul className="space-y-1">
                {headings.map((item) => (
                  <li
                    key={item.id}
                    style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
                    className="transition-all"
                  >
                    <a
                      href={`#${item.id}`}
                      className={`block py-2 px-3 rounded-lg transition-colors font-medium hover:bg-metta-accent/20 hover:text-metta-accent focus:text-metta-accent focus:bg-metta-accent/20 outline-none ${
                        activeSection === item.id
                          ? "bg-metta-accent/30 text-metta-accent font-semibold"
                          : "text-metta-darkText"
                      }`}
                      style={{
                        fontSize: item.level === 1 ? "1rem" : item.level === 2 ? "0.95rem" : "0.9rem",
                        fontWeight: item.level === 1 ? 700 : 500,
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                          setActiveSection(item.id);
                          setIsOpen(false);
                        }
                      }}
                    >
                      {activeSection === item.id && (
                        <span className="mr-2">▶</span>
                      )}
                      <span>{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 