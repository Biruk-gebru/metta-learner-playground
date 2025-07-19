import React, { useState, useEffect } from "react";

export interface TOCHeading {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
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
    handleScroll(); // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <nav
      className="toc bg-metta-darkPanel rounded-2xl shadow-lg p-4 text-sm font-sans min-h-[200px]"
      style={{
        color: "inherit",
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        fontSize: "0.95rem",
        lineHeight: 1.5,
      }}
    >
      <div className="font-bold text-base mb-2 text-metta-accent dark:text-metta-accent">On This Page</div>
      <ul className="space-y-0.5">
        {headings.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 1.1}rem` }}
            className="transition-all"
          >
            <a
              href={`#${item.id}`}
              className={`block py-0.5 px-2 rounded-lg transition-colors font-medium hover:bg-metta-accent/10 dark:hover:bg-metta-accent/20 hover:text-metta-accent focus:text-metta-accent focus:bg-metta-accent/10 outline-none ${
                activeSection === item.id
                  ? "bg-metta-accent/20 text-metta-accent font-semibold"
                  : "text-metta-darkText"
              }`}
              style={{
                fontSize: item.level === 1 ? "1rem" : item.level === 2 ? "0.95rem" : "0.92rem",
                fontWeight: item.level === 1 ? 700 : 500,
              }}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(item.id);
                }
              }}
            >
              {activeSection === item.id && (
                <span className="mr-1">▶</span>
              )}
              <span>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 