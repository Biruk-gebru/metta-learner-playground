import React, { useState } from 'react';
import { FaSave, FaEye, FaCode, FaUndo, FaDownload } from 'react-icons/fa';

interface ContentEditorProps {
  onSave: (content: string) => void;
  initialContent?: string;
  title?: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onSave, initialContent = '', title = 'Content Editor' }) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [codeBlockContent, setCodeBlockContent] = useState('');
  const [codeBlockLanguage, setCodeBlockLanguage] = useState('metta');

  const handleAddCodeBlock = () => {
    const codeBlock = `\n<CodeEditor initialCode={\`${codeBlockContent}\`} language="${codeBlockLanguage}" />\n`;
    setContent(prev => prev + codeBlock);
    setShowCodeBlock(false);
    setCodeBlockContent('');
  };

  const handleAddHeading = (level: number) => {
    const heading = `\n<h${level} className="text-${level === 1 ? '3xl' : level === 2 ? '2xl' : 'xl'} font-bold mb-4">Heading ${level}</h${level}>\n`;
    setContent(prev => prev + heading);
  };

  const handleAddParagraph = () => {
    const paragraph = '\n<p className="mb-4">\n  Your paragraph content here...\n</p>\n';
    setContent(prev => prev + paragraph);
  };

  const handleAddList = (type: 'ul' | 'ol') => {
    const list = `\n<${type} className="list-${type === 'ul' ? 'disc' : 'decimal'} pl-6 mb-4">\n  <li>List item 1</li>\n  <li>List item 2</li>\n</${type}>\n`;
    setContent(prev => prev + list);
  };

  const handleSave = () => {
    onSave(content);
  };

  const handleUndo = () => {
    setContent(initialContent);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.tsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-purple-100 text-sm mt-1">Write your content in JSX format</p>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isPreview 
                ? 'bg-purple-600 text-white' 
                : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600'
            }`}
          >
            <FaEye className="inline mr-1" />
            {isPreview ? 'Edit' : 'Preview'}
          </button>

          <button
            onClick={() => setShowCodeBlock(!showCodeBlock)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
          >
            <FaCode className="inline mr-1" />
            Add Code Block
          </button>

          <div className="flex gap-1">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                onClick={() => handleAddHeading(level)}
                className="px-2 py-1.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
              >
                H{level}
              </button>
            ))}
          </div>

          <button
            onClick={handleAddParagraph}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
          >
            Paragraph
          </button>

          <div className="flex gap-1">
            <button
              onClick={() => handleAddList('ul')}
              className="px-2 py-1.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
            >
              • List
            </button>
            <button
              onClick={() => handleAddList('ol')}
              className="px-2 py-1.5 rounded bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
            >
              1. List
            </button>
          </div>
        </div>
      </div>

      {/* Code Block Modal */}
      {showCodeBlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Add Code Block</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Language
              </label>
              <select
                value={codeBlockLanguage}
                onChange={(e) => setCodeBlockLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="metta">MeTTa</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Code Content
              </label>
              <textarea
                value={codeBlockContent}
                onChange={(e) => setCodeBlockContent(e.target.value)}
                className="w-full h-32 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-mono text-sm"
                placeholder="Enter your code here..."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowCodeBlock(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCodeBlock}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Add Code Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex">
        {!isPreview && (
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 px-6 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your content in JSX format here..."
            />
          </div>
        )}

        {isPreview && (
          <div className="flex-1 px-6 py-4 bg-slate-50 dark:bg-slate-800">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors flex items-center gap-2"
            >
              <FaUndo className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors flex items-center gap-2"
            >
              <FaDownload className="h-4 w-4" />
              Download
            </button>
          </div>
          
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <FaSave className="h-4 w-4" />
            Save Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor; 