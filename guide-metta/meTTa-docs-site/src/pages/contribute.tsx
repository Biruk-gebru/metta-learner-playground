import React from 'react';
import Layout from '../components/Layout';
import ContentEditor from '../components/ContentEditor';
import { FaEdit, FaCode, FaUsers } from 'react-icons/fa';
import { contentTemplates } from '../data/contentTemplates';
import { ContentTemplate } from '../types/content';
import { FeatureCard } from '../components/contribute/FeatureCard';
import { TemplateCard } from '../components/contribute/TemplateCard';
import useContributionEditor from '../hooks/useContributionEditor';

export default function ContributePage() {
  const { selectedTemplate, showEditor, selectTemplate, startBlank, backToTemplates } = useContributionEditor();

  const handleSaveContent = async (content: string) => {
    const payload = {
      title: selectedTemplate?.title || 'Untitled Contribution',
      category: selectedTemplate?.category || 'tutorial',
      content,
    };
    try {
      const res = await fetch('/api/contributions/save-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      alert('Draft saved. It will only be published after approval.');
    } catch (e: any) {
      alert(`Failed to save draft: ${e.message}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* TODO Banner */}
        <div className="mb-8 p-4 sm:p-6 rounded-2xl border-2 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-500 text-yellow-900 dark:text-yellow-200 font-semibold text-center">
          TODO: This Contributions page is a work in progress. We'll revisit after other priorities.
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Contribute to MeTTa Learner
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Help others learn MeTTa by creating tutorials, projects, and reference guides. 
            No HTML or markdown knowledge required!
          </p>
        </div>

        {!showEditor ? (
          <>
            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <FeatureCard icon={<FaEdit className="h-6 w-6 text-purple-600 dark:text-purple-400" />} title="Easy Content Creation" desc="Use our visual editor to create content without dealing with HTML or markdown syntax." tone="purple" />
              <FeatureCard icon={<FaCode className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} title="Interactive Code Blocks" desc="Add executable MeTTa code blocks with syntax highlighting and run them directly." tone="indigo" />
              <FeatureCard icon={<FaUsers className="h-6 w-6 text-green-600 dark:text-green-400" />} title="Community Driven" desc="Contribute your knowledge and help build the best MeTTa learning resource." tone="green" />
            </div>

            {/* Content Templates */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
                Choose a Content Template
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentTemplates.map((template: ContentTemplate) => (
                  <TemplateCard key={template.id} template={template} onSelect={selectTemplate} />
                ))}
              </div>
            </div>

            {/* Start from Scratch */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Or Start from Scratch
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Don't see a template that fits? Start with a blank canvas and create your own content structure.
              </p>
              <button
                onClick={startBlank}
                className="px-8 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 font-medium"
              >
                Start from Scratch
              </button>
            </div>
          </>
        ) : (
          <div className="mb-8">
            <button
              onClick={backToTemplates}
              className="mb-6 px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              ← Back to Templates
            </button>
            
            <ContentEditor
              title={selectedTemplate?.title || 'Content Editor'}
              initialContent={selectedTemplate?.template || ''}
              onSave={handleSaveContent}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
 