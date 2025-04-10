'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from '~/components/message/message';

import styles from './editor.module.css';

interface RequestBodyEditorProps {
  dict: Record<string, string>;
  value: string;
  onBlur: (value: string) => void;
  className?: string;
}

export default function RequestBodyEditor({ dict, value, onBlur, className = '' }: RequestBodyEditorProps) {
  const modeOptions = ['json', 'text'];
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
        onBlur(formatted);
        editorRef.current.innerText = formatted;
      }
    }
  };

  const handleEditorBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
    onBlur(e.target.innerText);
  };

  return (
    <div className={className}>
      <div className={styles.editor__controls}>
        <h3 className={styles.editor__title}>{dict.body}</h3>
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
              {dict.prettify}
            </button>
          )}
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable="true"
        onBlur={handleEditorBlur}
        className={styles.editor}
        suppressContentEditableWarning
      />
    </div>
  );
}
