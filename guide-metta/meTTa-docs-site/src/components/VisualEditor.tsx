import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaEye, FaSave, FaTimes, FaCode, FaPlay, FaGithub } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Dynamically import CodeEditor to avoid SSR issues
const CodeEditor = dynamic(() => import('./CodeEditor'), { ssr: false });

interface VisualEditorProps {
  initialContent: string;
  pageSlug: string;
  pageTitle: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

interface EditableBlock {
  id: string;
  type: 'text' | 'code' | 'heading';
  content: string;
  language?: 'metta' | 'python';
}

const VisualEditor: React.FC<VisualEditorProps> = ({
  initialContent,
  pageSlug,
  pageTitle,
  onSave,
  onCancel
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [blocks, setBlocks] = useState<EditableBlock[]>([]);
  const [previewContent, setPreviewContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Parse initial content into editable blocks
  useEffect(() => {
    const parsedBlocks = parseContentToBlocks(initialContent);
    setBlocks(parsedBlocks);
    setPreviewContent(initialContent);
  }, [initialContent]);

  // Parse TSX content into editable blocks
  const parseContentToBlocks = (content: string): EditableBlock[] => {
    const blocks: EditableBlock[] = [];
    
    // Simple parsing - in a real implementation, you'd use a proper TSX parser
    const lines = content.split('\n');
    let currentBlock: EditableBlock | null = null;
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Detect headings
      if (trimmedLine.startsWith('<h1') || trimmedLine.startsWith('<h2') || trimmedLine.startsWith('<h3')) {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          id: `block-${index}`,
          type: 'heading',
          content: line
        };
      }
      // Detect code blocks
      else if (trimmedLine.includes('<CodeEditor') || trimmedLine.includes('<CodeSpace')) {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
                 currentBlock = {
           id: `block-${index}`,
           type: 'code',
           content: line,
           language: 'metta' as const // Default, could be detected from props
         };
      }
      // Regular text content
      else {
        if (!currentBlock) {
          currentBlock = {
            id: `block-${index}`,
            type: 'text',
            content: line
          };
        } else {
          currentBlock.content += '\n' + line;
        }
      }
    });
    
    if (currentBlock) {
      blocks.push(currentBlock);
    }
    
    return blocks;
  };

  // Convert blocks back to TSX content
  const blocksToContent = (blocks: EditableBlock[]): string => {
    return blocks.map(block => block.content).join('\n');
  };

  // Update a specific block
  const updateBlock = (id: string, content: string) => {
    const updatedBlocks = blocks.map(block => 
      block.id === id ? { ...block, content } : block
    );
    setBlocks(updatedBlocks);
    setPreviewContent(blocksToContent(updatedBlocks));
  };

  // Add a new block
  const addBlock = (type: 'text' | 'code' | 'heading', afterId?: string) => {
    const newBlock: EditableBlock = {
      id: `block-${Date.now()}`,
      type,
             content: type === 'heading' ? '<h2>New Heading</h2>' : 
                type === 'code' ? '<CodeEditor initialCode="" language="metta" />' : 
                'New text content',
       language: type === 'code' ? 'metta' as const : undefined
    };

    if (afterId) {
      const index = blocks.findIndex(b => b.id === afterId);
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
    } else {
      setBlocks([...blocks, newBlock]);
    }
  };

  // Remove a block
  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  // Handle save
  const handleSave = () => {
    const finalContent = blocksToContent(blocks);
    onSave(finalContent);
    setIsEditing(false);
  };

  // Render a block in edit mode
  const renderEditableBlock = (block: EditableBlock) => {
    const isSelected = selectedBlock === block.id;
    
    return (
      <div 
        key={block.id}
        className={`relative border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'} rounded-lg p-2 mb-4`}
        onClick={() => setSelectedBlock(block.id)}
      >
        {/* Block controls */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addBlock('text', block.id);
            }}
            className="p-1 bg-green-500 text-white rounded text-xs"
            title="Add text block after"
          >
            +T
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addBlock('code', block.id);
            }}
            className="p-1 bg-blue-500 text-white rounded text-xs"
            title="Add code block after"
          >
            +C
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}
            className="p-1 bg-red-500 text-white rounded text-xs"
            title="Remove block"
          >
            ×
          </button>
        </div>

        {/* Block content */}
        {block.type === 'code' ? (
          <div className="mt-6">
            <CodeEditor
              initialCode={block.content}
              language={block.language || 'metta'}
              className="mb-4"
            />
          </div>
        ) : (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg font-mono text-sm"
            placeholder={block.type === 'heading' ? 'Enter heading...' : 'Enter content...'}
          />
        )}
      </div>
    );
  };

  // Render preview mode
  const renderPreview = () => {
    return (
      <div className="prose dark:prose-invert max-w-none">
        {blocks.map((block) => {
          if (block.type === 'code') {
            return (
              <div key={block.id} className="my-4">
                <CodeEditor
                  initialCode={block.content}
                  language={block.language || 'metta'}
                />
              </div>
            );
          }
          if (block.type === 'heading') {
            // Allow simple heading HTML; contributors are constrained by the editor UI
            return (
              <div
                key={block.id}
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            );
          }
          // Default text block: render as plain text
          return (
            <p key={block.id} className="whitespace-pre-wrap">
              {block.content}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Visual Editor - {pageTitle}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Edit content visually with live preview
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isPreviewMode 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isPreviewMode ? <FaEye /> : <FaCode />}
              {isPreviewMode ? 'Preview' : 'Edit'}
            </button>
            
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
            >
              <FaSave />
              Save Changes
            </button>
            
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg flex items-center gap-2 hover:bg-gray-600 transition-colors"
            >
              <FaTimes />
              Cancel
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {isPreviewMode ? (
            <div className="h-full overflow-y-auto p-6">
              {renderPreview()}
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6">
              <div className="mb-6">
                <button
                  onClick={() => addBlock('heading')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition-colors"
                >
                  Add Heading
                </button>
                <button
                  onClick={() => addBlock('text')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600 transition-colors"
                >
                  Add Text
                </button>
                <button
                  onClick={() => addBlock('code')}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Add Code Block
                </button>
              </div>
              
              {blocks.map(renderEditableBlock)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;
