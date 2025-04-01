'use client';

import { useRef, useState } from 'react';
import { tryParseJson } from '~/utils/pretty';

import styles from './editor.module.css';

interface RequestBodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RequestBodyEditor({ value, onChange, className = '' }: RequestBodyEditorProps) {
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const editorRef = useRef<HTMLDivElement>(null);

  const handlePrettify = () => {
    if (mode === 'json' && value && editorRef.current) {
      const formatted = tryParseJson(value);
      if (formatted) {
        onChange(formatted);
        editorRef.current.innerText = formatted;
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    onChange(e.target.innerText);
  };

  return (
    <div className={className}>
      <div className={styles.editor__controls}>
        <h3 className={styles.editor__title}>Body</h3>
        <div className={styles.editor__btns}>
          <select
            value={mode}
            onChange={e => setMode(e.target.value as 'json' | 'text')}
            className={styles.editor__mode}
          >
            <option value="json">JSON</option>
            <option value="text">Plain Text</option>
          </select>
          {mode === 'json' && (
            <button onClick={handlePrettify} className={`button ${styles.editor__prettify}`} title="Format JSON">
              Prettify
            </button>
          )}
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        onInput={handleInput}
        className={`
          ${styles.editor}
          ${mode === 'json' ? styles.jsonEditor : ''}
        `}
        suppressContentEditableWarning
      />
    </div>
  );
}
