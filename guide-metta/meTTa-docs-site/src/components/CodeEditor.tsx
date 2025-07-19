import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });
import { FaLock, FaUnlock, FaCopy, FaCheck, FaRedo, FaPlay, FaEraser, FaSpinner } from "react-icons/fa";

interface CodeEditorProps {
  initialCode: string;
  language: "python" | "metta";
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, language, className = "" }) => {
  const [code, setCode] = useState(initialCode);
  const [readOnly, setReadOnly] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [extensions, setExtensions] = useState<any[]>([]);
  const [theme, setTheme] = useState<any>(undefined);
  const editorRef = useRef<any>(null);
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string>("");
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [queueStatus, setQueueStatus] = useState<string>("");

  const backendUrl = "https://metta-learner-playground-production.up.railway.app";

  // Helper to generate a unique codeId
  const generateCodeId = () => `code_${Date.now()}_${Math.floor(Math.random()*10000)}`;

  const handleRun = async () => {
    setIsRunning(true);
    setError("");
    setOutput("");
    setQueuePosition(null);
    setQueueStatus("");
    
    console.log("Backend URL:", backendUrl);
    
    try {
      if (language === "metta") {
        const requestBody = {
          code,
          language: "metta",
          codeId: generateCodeId(),
        };
        console.log("Sending request to:", `${backendUrl}/run-metta`);
        console.log("Request body:", requestBody);
        
        const response = await fetch(`${backendUrl}/run-metta`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
        
        // Check if response has content before parsing JSON
        const responseText = await response.text();
        console.log("Response text:", responseText);
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        
        let data;
        try {
          data = responseText ? JSON.parse(responseText) : {};
          console.log("Parsed data:", data);
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          setError("Invalid response from server");
          return;
        }
        
        if (response.ok) {
          const result = data.result || "";
          console.log("Result:", result);
          if (result.trim() === "") {
            setOutput("(no output)");
          } else {
            setOutput(result.trim());
          }
        } else {
          console.log("Response not ok, error data:", data);
          setError((data.error || "Unknown error").trim());
        }
      } else if (language === "python") {
        const response = await fetch(`${backendUrl}/run-python`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        
        // Check if response has content before parsing JSON
        const responseText = await response.text();
        let data;
        try {
          data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          setError("Invalid response from server");
          return;
        }
        
        if (response.ok) {
          const result = data.result || "";
          if (result.trim() === "") {
            setOutput("(no output)");
          } else {
            setOutput(result.trim());
          }
        } else {
          setError((data.error || "Unknown error").trim());
        }
      } else {
        setError("Running code is only supported for MeTTa and Python blocks right now.");
      }
    } catch (err: any) {
      setError((err.message || "Failed to run code").trim());
    } finally {
      setIsRunning(false);
      setQueuePosition(null);
      setQueueStatus("");
    }
  };

  const handleClearOutput = () => {
    setOutput("");
    setError("");
  };

  // Check queue status
  const checkQueueStatus = async () => {
    try {
      const response = await fetch(`${backendUrl}/queue-status`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (err) {
      console.error("Failed to check queue status:", err);
    }
    return null;
  };

  useEffect(() => {
    let isMounted = true;
    async function loadExtensions() {
      let ext = [];
      let loadedTheme = undefined;
      if (language === "python") {
        const mod = await import("@codemirror/lang-python");
        const python = mod.python;
        if (!python) throw new Error("Failed to load python extension from @codemirror/lang-python. Try pinning to version 6.1.3 and reinstalling dependencies.");
        ext = [python()];
      } else if (language === "metta") {
        const { mettaLang } = await import("../codemirror/lang-metta");
        ext = [mettaLang()];
      }
      const { oneDark } = await import("@codemirror/theme-one-dark");
      loadedTheme = oneDark;
      if (isMounted) {
        setExtensions(ext);
        setTheme(loadedTheme);
      }
    }
    loadExtensions();
    return () => { isMounted = false; };
  }, [language]);

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {}
  };

  // Reset code to initial value
  const handleReset = () => {
    setCode(initialCode);
    setIsReset(true);
    setTimeout(() => setIsReset(false), 1000);
  };

  // Toggle read-only mode
  const toggleReadOnly = () => setReadOnly((r) => !r);

  return (
    <div className={`relative my-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-metta-lightPanel dark:bg-metta-darkPanel px-3 py-2 rounded-t-md border-b gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-metta-accent">{language}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
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
            className="p-2 rounded text-xs border font-bold bg-metta-accent text-white hover:bg-metta-accent/80 flex items-center justify-center relative min-w-[60px]"
            aria-label="Run code"
            title={isRunning ? "Running..." : "Run code"}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <div className="flex items-center gap-1 absolute inset-0 justify-center">
                <FaSpinner className="animate-spin" />
                <span className="text-xs">Running...</span>
              </div>
            ) : (
              <FaPlay />
            )}
          </button>
          <button
            className="p-2 rounded text-xs border hover:bg-metta-accent/10 flex items-center justify-center"
            aria-label="Clear output"
            title="Clear output"
            onClick={handleClearOutput}
            disabled={isRunning && !output && !error}
          >
            <FaEraser />
          </button>
        </div>
      </div>
      {/* Only render CodeMirror when extensions and theme are loaded */}
      {theme && extensions.length > 0 && (
        <CodeMirror
          ref={editorRef}
          value={code}
          height="160px"
          theme={theme}
          extensions={extensions}
          onChange={setCode}
          readOnly={readOnly}
          basicSetup={{ lineNumbers: true, highlightActiveLine: true }}
          className="rounded-b-md border-none font-mono text-xs sm:text-sm"
          style={{ background: "transparent" }}
        />
      )}
      {/* Queue Status Indicator */}
      {isRunning && (
        <div className="mt-2 p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2">
            <FaSpinner className="animate-spin" />
            <span>Your code is queued and will be executed in order...</span>
          </div>
        </div>
      )}
      
      {(output || error) && (
        <div
          className="mt-2 p-3 rounded bg-metta-lightPanel dark:bg-metta-darkPanel text-sm whitespace-pre-wrap border border-metta-accent"
          aria-live="polite"
        >
          {output && <div style={{ marginBottom: error ? 8 : 0 }}><b>Output:</b> <span style={{ whiteSpace: 'pre-wrap' }}>{output}</span></div>}
          {error && <div className="text-red-500"><b>Error:</b> <span style={{ whiteSpace: 'pre-wrap' }}>{error}</span></div>}
        </div>
      )}
    </div>
  );
};

export default CodeEditor; 