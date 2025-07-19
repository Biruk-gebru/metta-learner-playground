import { StreamLanguage } from '@codemirror/language';
import { LanguageSupport } from '@codemirror/language';

// Simple MeTTa tokenizer based on Prism/VSCode extension
const metta = StreamLanguage.define({
  startState: () => ({}),
  token(stream) {
    if (stream.match(/;.*$/)) return 'comment';
    if (stream.match(/\$[a-zA-Z_][a-zA-Z0-9_-]*/)) return 'variableName';
    if (stream.match(/&[a-zA-Z_][a-zA-Z0-9_-]*/)) return 'atomspace';
    if (stream.match(/'(?:[^'\\]|\\.)*'/) || stream.match(/"(?:[^"\\]|\\.)*"/)) return 'string';
    if (stream.match(/\b\d+(?:\.\d+)?\b/)) return 'number';
    if (stream.match(/\bType!\b/)) return 'keyword';
    if (stream.match(/[:+*/\-|=]|->/)) return 'operator';
    if (stream.match(/[\[\]{}()]/)) return 'bracket';
    if (stream.match(/[;,]/)) return 'punctuation';
    stream.next();
    return null;
  },
});

export function mettaLang() {
  return new LanguageSupport(metta);
} 