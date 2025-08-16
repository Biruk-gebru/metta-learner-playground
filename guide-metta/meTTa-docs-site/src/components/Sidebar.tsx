import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaBook,
  FaCode,
  FaRocket,
  FaCog,
  FaQuestionCircle,
  FaLightbulb,
  FaProjectDiagram,
  FaBrain,
  FaList,
  FaBookOpen,
} from "react-icons/fa";

const Sidebar = ({ dark = false }: { dark?: boolean }) => {
  const router = useRouter();

  const navigation = [
    {
      title: "Getting Started",
      items: [
        { label: "Installation", href: "/installation", icon: FaCog },
        {
          label: "What is MeTTa?",
          href: "/what-is-metta",
          icon: FaQuestionCircle,
        },
        {
          label: "Functional Programming",
          href: "/functional-programming",
          icon: FaRocket,
        },
      ],
    },
    {
      title: "Core Concepts",
      items: [
        { label: "Atomspace", href: "/atomspace", icon: FaBrain },
        {
          label: "Non-Determinism",
          href: "/nondeterminism",
          icon: FaLightbulb,
        },
        { label: "Recursion", href: "/recursion", icon: FaCode },
        { label: "Standard Library", href: "/standard-library", icon: FaBook },
      ],
    },
    {
      title: "Best Practices",
      items: [
        { label: "Best Practices", href: "/best-practices", icon: FaLightbulb },
      ],
    },
    {
      title: "Resources",
      items: [
        { label: "Glossary", href: "/glossary", icon: FaBookOpen },
        { label: "References", href: "/references", icon: FaList },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          label: "Family Tree",
          href: "/projects/family-tree",
          icon: FaProjectDiagram,
        },
        {
          label: "Python Integration",
          href: "/projects/python-integration",
          icon: FaCode,
        },
        {
          label: "Neuro-Symbolic",
          href: "/projects/neuro-symbolic",
          icon: FaBrain,
        },
        { label: "List Utils", href: "/projects/list-utils", icon: FaCode },
      ],
    },
  ];

  const isActive = (href: string) => {
    return router.pathname === href || router.asPath.startsWith(href);
  };

  return (
    <div
      className={`h-full ${dark ? "bg-slate-900/50" : "bg-white/50"} 
      backdrop-blur-sm overflow-y-auto overflow-x-hidden 
      scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent`}
    >
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            MeTTa Learner
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Learn Symbolic & Neuro-Symbolic Programming
          </p>
        </div>

        <nav className="space-y-8">
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
                          className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            active
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                              : "text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              active
                                ? "text-white"
                                : "text-slate-400 group-hover:text-purple-500"
                            }`}
                          />
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
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link href="/contribute" legacyBehavior>
              <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200">
                <FaCode className="h-4 w-4 text-slate-400 group-hover:text-green-500" />
                Contribute Content
              </a>
            </Link>
            <a
              href="https://discord.com/invite/snet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
            >
              <FaQuestionCircle className="h-4 w-4 text-slate-400" />
              Get Help
            </a>
            <a
              href="https://community.singularitynet.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200"
            >
              <FaBook className="h-4 w-4 text-slate-400" />
              Community Forum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
