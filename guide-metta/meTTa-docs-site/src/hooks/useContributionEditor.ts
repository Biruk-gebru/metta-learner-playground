import { useCallback, useState } from 'react';
import { ContentTemplate } from '../types/content';

export function useContributionEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const selectTemplate = useCallback((t: ContentTemplate) => {
    setSelectedTemplate(t);
    setShowEditor(true);
  }, []);

  const startBlank = useCallback(() => {
    setSelectedTemplate({
      id: 'blank',
      title: 'Blank Template',
      description: 'Start with a clean slate',
      category: 'tutorial',
      template: ''
    });
    setShowEditor(true);
  }, []);

  const backToTemplates = useCallback(() => {
    setShowEditor(false);
  }, []);

  return {
    selectedTemplate,
    showEditor,
    selectTemplate,
    startBlank,
    backToTemplates,
  };
}

export default useContributionEditor;
