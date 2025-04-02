'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from '~/components/message/message';

import styles from './editor.module.css';

const modeOptions = ['json', 'text'];

interface RequestBodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function RequestBodyEditor({ value, onChange, className = '' }: RequestBodyEditorProps) {
  const [mode, setMode] = useState('json');
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerText = value;
    }
  }, []);

  const tryParseJson = (data: string) => {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      Message.show('Invalid JSON', 'error');
      return null;
    }
  };

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
          <select value={mode} onChange={e => setMode(e.target.value)} className={styles.editor__mode}>
            {modeOptions.map(mode => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
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
        className={styles.editor}
        suppressContentEditableWarning
      />
    </div>
  );
}
