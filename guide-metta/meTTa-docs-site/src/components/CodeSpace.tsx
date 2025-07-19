import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
// You may need to add a custom MeTTa highlighter or fallback to plain text
import "prismjs/themes/prism-tomorrow.css";
import { useMeTTaHighlighter } from "../hooks/useMeTTaHighlighter";
import { FaLock, FaUnlock, FaCopy, FaCheck, FaRedo, FaPlay } from "react-icons/fa";

interface CodeSpaceProps {
  initialCode: string;
  language: "python" | "metta";
  className?: string;
}

const CodeSpace: React.FC<CodeSpaceProps> = ({ initialCode, language, className = "" }) => {
  const [code, setCode] = useState(initialCode);
  const [readOnly, setReadOnly] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // Use custom MeTTa highlighter for MeTTa code
  const { highlightedCode } = language === "metta"
    ? useMeTTaHighlighter(code)
    : { highlightedCode: Prism.highlight(code, Prism.languages.python, "python") };

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  // Sync scroll between textarea and highlight
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // handle error
    }
  };

  // Reset code to initial value
  const handleReset = () => {
    setCode(initialCode);
    setIsReset(true);
    setTimeout(() => setIsReset(false), 1000);
  };

  // Toggle read-only mode
  const toggleReadOnly = () => setReadOnly((r) => !r);

  // Shared styles for perfect alignment
  const sharedStyles =
    "w-full font-mono text-sm p-4 resize-none bg-transparent focus:outline-none focus:ring-0 focus:border-none leading-[1.5] whitespace-pre-wrap";

  return (
    <div className={`relative my-6 ${className}`}>
      <div className="flex items-center justify-between bg-metta-lightPanel dark:bg-metta-darkPanel px-3 py-2 rounded-t-md border-b">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-metta-accent">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded text-xs border hover:bg-metta-accent/10 flex items-center justify-center"
            onClick={toggleReadOnly}
            aria-label={readOnly ? "Unlock editor" : "Lock editor"}
            title={readOnly ? "Unlock editor" : "Lock editor"}
          >
            {readOnly ? <FaUnlock /> : <FaLock />}
          </button>
          <button
            className="p-2 rounded text-xs border hover:bg-metta-accent/10 flex items-center justify-center"
            onClick={copyToClipboard}
            aria-label="Copy code"
            title={isCopied ? "Copied!" : "Copy code"}
          >
            {isCopied ? <FaCheck /> : <FaCopy />}
          </button>
          <button
            className="p-2 rounded text-xs border hover:bg-metta-accent/10 flex items-center justify-center"
            onClick={handleReset}
            aria-label="Reset code"
            title="Reset code"
          >
            <FaRedo />
          </button>
          <button
            className="p-2 rounded text-xs border font-bold bg-metta-accent text-white hover:bg-metta-accent/80 flex items-center justify-center"
            aria-label="Run code"
            title="Run code"
            // onClick={runCode} // Placeholder for future integration
          >
            <FaPlay />
          </button>
        </div>
      </div>
      <div className="relative" style={{ minHeight: "120px" }}>
        <pre
          ref={preRef}
          className={`absolute top-0 left-0 m-0 rounded-b-md pointer-events-none ${sharedStyles}`}
          style={{ zIndex: 1 }}
        >
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onScroll={handleScroll}
          readOnly={readOnly}
          spellCheck={false}
          className={`relative z-10 text-transparent caret-metta-accent ${sharedStyles}`}
          style={{
            caretColor: readOnly ? "gray" : "#f59e42",
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default CodeSpace; 