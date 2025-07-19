import React from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import { MobileTableOfContents } from "./MobileTableOfContents";
import Link from "next/link";
import { FaBrain } from "react-icons/fa";
import { TableOfContents } from "./TableOfContents";
import { extractHeadingsFromChildren } from "./extractHeadings";

const Layout = ({ children, headings: headingsProp }: { children: React.ReactNode, headings?: any }) => {
  const headings = headingsProp || extractHeadingsFromChildren(children);

  return (
    <div className={"min-h-screen flex flex-col bg-metta-darkBg"}>
      {/* Top nav bar/header */}
      <header className="fixed top-0 left-0 z-40 w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b bg-metta-darkPanel border-metta-darkPanel" style={{ minHeight: '64px' }}>
        <div className="flex items-center gap-3 min-w-max">
          <FaBrain className="h-6 w-6" />
          <Link href="/" className="font-bold text-xl relative">
            <span
              className="inline-block px-2 py-1 rounded"
              style={{
                background: "linear-gradient(90deg, #a259ff 0%, #000 100%)",
                color: "#fff",
                boxShadow: "0 0 12px 2px #a259ff99, 0 0 2px 1px #000",
                textShadow: "0 0 8px #a259ff, 0 0 2px #000"
              }}
            >
              MeTTa Learner
            </span>
          </Link>
        </div>
        <MobileMenu />
      </header>
      <div className="flex flex-1 pt-20 bg-metta-darkBg">
        {/* Left sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar dark={true} />
        </div>
        <main className="flex-1 flex justify-center items-start overflow-y-auto bg-metta-darkBg" style={{ minHeight: '100vh' }}>
          <div className="max-w-3xl w-full p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
        {/* Table of contents - hidden on mobile */}
        <aside className="hidden xl:block w-64 min-w-56 max-w-64 h-full border-l bg-metta-darkPanel p-4 flex-shrink-0 overflow-y-auto">
          <TableOfContents headings={headings} />
        </aside>
      </div>
      
      {/* Mobile Table of Contents */}
      <MobileTableOfContents headings={headings} />
      
      <footer className="w-full text-center py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-8">
        <span>Created by <a href="https://github.com/Biruk-gebru" target="_blank" rel="noopener noreferrer" className="underline">Biruk Gebru Jember (@Biruk-gebru)</a></span>
      </footer>
    </div>
  );
};

export default Layout;
