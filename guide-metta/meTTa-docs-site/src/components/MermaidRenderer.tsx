import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  code: string;
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    if (ref.current) {
      try {
        mermaid.initialize({ startOnLoad: false, theme: "default" });
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 10)}`;
        mermaid
          .render(uniqueId, code)
          .then((result: any) => {
            // result.svg is the SVG string
            if (ref.current && isMounted) ref.current.innerHTML = result.svg;
          })
          .catch((err: any) => {
            if (ref.current && isMounted)
              ref.current.innerHTML = `<pre style='color:red'>Mermaid render error: ${err}</pre>`;
          });
      } catch (err) {
        if (ref.current && isMounted)
          ref.current.innerHTML = `<pre style='color:red'>Mermaid render error: ${err}</pre>`;
      }
    }
    return () => {
      isMounted = false;
    };
  }, [code]);

  return (
    <div className="my-6 rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 overflow-x-auto shadow">
      <div ref={ref} />
    </div>
  );
};

export default MermaidRenderer;
