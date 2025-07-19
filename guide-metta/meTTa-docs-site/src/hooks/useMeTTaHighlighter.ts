import { useState, useEffect } from 'react';

interface UseMeTTaHighlighterReturn {
  highlightedCode: string;
  prismLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

// Type definitions for Prism
interface PrismToken {
  type: string;
  content: any; // Prism's TokenStream can be complex, so we use any here
  alias?: string | string[];
}

interface StackItem {
  index: number;
  level: number;
}

export const useMeTTaHighlighter = (code: string): UseMeTTaHighlighterReturn => {
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [prismLoaded, setPrismLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrism = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const prismModule = await import('prismjs');
        const Prism = prismModule.default;
        Prism.languages.metta = {
          comment: [
            { pattern: /;.*$/m, greedy: true },
            { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
          ],
          string: [
            { pattern: /'(?:[^'\\]|\\.)*'/, greedy: true },
            { pattern: /"(?:[^"\\]|\\.)*"/, greedy: true },
          ],
          variable: { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/, alias: 'variable' },
          atomspace: { pattern: /&[a-zA-Z_][a-zA-Z0-9_-]*/, alias: 'atomspace' },
          keyword: { pattern: /\b(?:Type!)\b/, alias: 'keyword', greedy: true },
          operator: { pattern: /[:+*/\-]|->|=/, alias: 'operator' },
          number: { pattern: /\b\d+(?:\.\d+)?\b/ },
          function: { pattern: /\b[a-zA-Z][a-zA-Z0-9-]*(?=\s*[(!])/, },
          bracket: { pattern: /[\[\]{}]/, },
          punctuation_mark: { pattern: /[;,]/, },
        };
        // Add custom parentheses handling after language definition
        Prism.hooks.add('after-tokenize', function (env: any) {
          if (env.language !== 'metta') return;
          processParentheses(env.tokens);
        });
        // Function to process parentheses and add nesting levels
        function processParentheses(tokens: any[]): void {
          const stack: StackItem[] = [];
          function processToken(token: any, index: number, parentArray: any[]): number {
            if (typeof token === 'string') {
              const chars = token.split('');
              const newTokens: any[] = [];
              for (let i = 0; i < chars.length; i++) {
                const char = chars[i];
                if (char === '(') {
                  stack.push({ index: newTokens.length, level: stack.length });
                  newTokens.push(new Prism.Token('paren-open', char, [`paren-level-${stack.length % 6}`]));
                } else if (char === ')') {
                  if (stack.length > 0) {
                    const openParen = stack.pop();
                    newTokens.push(new Prism.Token('paren-close', char, [`paren-level-${(stack.length + 1) % 6}`]));
                  } else {
                    newTokens.push(new Prism.Token('paren-unmatched', char, ['paren-error']));
                  }
                } else {
                  newTokens.push(char);
                }
              }
              if (newTokens.length > 1 || (newTokens.length === 1 && typeof newTokens[0] !== 'string')) {
                parentArray.splice(index, 1, ...newTokens);
                return newTokens.length - 1;
              }
            } else if (token.type === 'punctuation' && token.alias === 'parenthesis') {
              if (token.content === '(') {
                stack.push({ index, level: stack.length });
                token.type = 'paren-open';
                token.alias = [`paren-level-${stack.length % 6}`];
              } else if (token.content === ')') {
                if (stack.length > 0) {
                  const openParen = stack.pop();
                  token.type = 'paren-close';
                  token.alias = [`paren-level-${(stack.length + 1) % 6}`];
                } else {
                  token.type = 'paren-unmatched';
                  token.alias = ['paren-error'];
                }
              }
            } else if (token.content && Array.isArray(token.content)) {
              for (let i = 0; i < token.content.length; i++) {
                const offset = processToken(token.content[i], i, token.content);
                if (offset) i += offset;
              }
            }
            return 0;
          }
          for (let i = 0; i < tokens.length; i++) {
            const offset = processToken(tokens[i], i, tokens);
            if (offset) i += offset;
          }
          // Mark remaining unclosed parentheses (optional, not implemented)
        }
        setPrismLoaded(true);
      } catch (err) {
        setError('Failed to load syntax highlighter');
      } finally {
        setIsLoading(false);
      }
    };
    loadPrism();
  }, []);

  useEffect(() => {
    if (!prismLoaded || !code) {
      if (code) setHighlightedCode(escapeHtml(code));
      return;
    }
    const highlightCode = async () => {
      try {
        const Prism = (await import('prismjs')).default;
        const highlighted = Prism.highlight(code, Prism.languages.metta, 'metta');
        setHighlightedCode(highlighted);
      } catch (err) {
        setHighlightedCode(escapeHtml(code));
        setError('Failed to highlight code, showing plain text');
      }
    };
    highlightCode();
  }, [code, prismLoaded]);

  const escapeHtml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return { highlightedCode, prismLoaded, isLoading, error };
}; 