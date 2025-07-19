import React, { useEffect, useState } from "react";
import MermaidRenderer from "./MermaidRenderer";

interface TextFileViewerProps {
  filePath: string; // relative to public or src/content
}

const parseContent = (content: string) => {
  // Split by mermaid/code blocks and paragraphs
  const regex = /```(mermaid|[a-z]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  const elements: React.ReactNode[] = [];
  let key = 0;

  while ((match = regex.exec(content))) {
    if (match.index > lastIndex) {
      // Add text before the code block
      const text = content.slice(lastIndex, match.index).trim();
      if (text) {
        text.split(/\n\n+/g).forEach((para) => {
          elements.push(
            <p key={key++} className="mb-4 whitespace-pre-line">{para}</p>
          );
        });
      }
    }
    const lang = match[1];
    const code = match[2];
    if (lang === "mermaid") {
      elements.push(<MermaidRenderer key={key++} code={code} />);
    } else {
      elements.push(
        <pre key={key++} className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 my-4 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
      );
    }
    lastIndex = regex.lastIndex;
  }
  // Add any remaining text
  if (lastIndex < content.length) {
    const text = content.slice(lastIndex).trim();
    if (text) {
      text.split(/\n\n+/g).forEach((para) => {
        elements.push(
          <p key={key++} className="mb-4 whitespace-pre-line">{para}</p>
        );
      });
    }
  }
  return elements;
};

const TextFileViewer: React.FC<TextFileViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then(setContent)
      .catch((err) => setError(err.message));
  }, [filePath]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!content) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow p-6 max-w-3xl mx-auto my-8 text-base leading-relaxed text-gray-800 dark:text-gray-100 overflow-x-auto">
      {parseContent(content)}
    </div>
  );
};

export default TextFileViewer; 