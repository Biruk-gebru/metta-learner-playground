import React from 'react';
import { ContentTemplate } from '../../types/content';
import { FaBook, FaCode, FaEdit } from 'react-icons/fa';

interface TemplateCardProps {
  template: ContentTemplate;
  onSelect: (t: ContentTemplate) => void;
}

const iconFor = (category: ContentTemplate['category']) => {
  if (category === 'tutorial') return <FaBook className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
  if (category === 'project') return <FaCode className="h-5 w-5 text-green-600 dark:text-green-400" />;
  return <FaEdit className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <div
      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(template)}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          template.category === 'tutorial' ? 'bg-blue-100 dark:bg-blue-900/30' :
          template.category === 'project' ? 'bg-green-100 dark:bg-green-900/30' :
          'bg-purple-100 dark:bg-purple-900/30'
        }`}>
          {iconFor(template.category)}
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          template.category === 'tutorial' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
          template.category === 'project' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
          'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
        }`}>
          {template.category}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        {template.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">
        {template.description}
      </p>
      <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium">
        Use Template
      </button>
    </div>
  );
};

export default TemplateCard;
