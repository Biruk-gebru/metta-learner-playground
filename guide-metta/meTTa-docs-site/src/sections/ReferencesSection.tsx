import React from "react";
import SectionNav, { getNavigationItems } from "../components/SectionNav";

const ReferencesSection = () => {
  const navigation = getNavigationItems("references");
  
  return (
  <div className="max-w-3xl mx-auto px-4 py-8 text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-900 rounded-2xl shadow">
    <h1 className="text-3xl font-bold mb-4">References & Credits</h1>
    <p className="mb-4">
      This project was created and maintained by <b>Karan Os</b> (<a href="https://github.com/karanos" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">@karanos</a>).
    </p>
    <SectionNav previous={navigation.previous} next={navigation.next} />
  </div>
  );
};

export default ReferencesSection; 