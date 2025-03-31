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
// 'use client';

// import { useRef, useState } from 'react';
// import { Message } from '~/components/message/message';
// import styles from './editor.module.css';

// interface RequestBodyEditorProps {
//   value: string;
//   onChange: (value: string) => void;
//   className?: string;
// }

// export default function RequestBodyEditor({ value, onChange, className = '' }: RequestBodyEditorProps) {
//   const [mode, setMode] = useState<'json' | 'text'>('json');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editValue, setEditValue] = useState(value);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   // Подсветка JSON
//   const highlightJson = (json: string) => {
//     try {
//       const parsed = JSON.parse(json);
//       return JSON.stringify(parsed, null, 2).replace(
//         /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
//         match => {
//           let cls = styles.jsonDefault;
//           if (/^"/.test(match)) {
//             cls = /:$/.test(match) ? styles.jsonKey : styles.jsonValue;
//           } else if (/true|false/.test(match)) {
//             cls = styles.jsonBoolean;
//           } else if (/null/.test(match)) {
//             cls = styles.jsonNull;
//           } else if (!isNaN(Number(match))) {
//             cls = styles.jsonNumber;
//           }
//           return `<span class="${cls}">${match}</span>`;
//         }
//       );
//     } catch {
//       return json;
//     }
//   };

//   const handlePrettify = () => {
//     try {
//       const formatted = JSON.stringify(JSON.parse(value), null, 2);
//       onChange(formatted);
//       setEditValue(formatted);
//     } catch {
//       Message.show('Invalid JSON');
//     }
//   };

//   const startEditing = () => {
//     setEditValue(value);
//     setIsEditing(true);
//     setTimeout(() => textareaRef.current?.focus(), 0);
//   };

//   const saveEditing = () => {
//     onChange(editValue);
//     setIsEditing(false);
//   };

//   const cancelEditing = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className={`${styles.container} ${className}`}>
//       <div className={styles.controls}>
//         <h3 className={styles.title}>Body</h3>
//         <div className={styles.buttons}>
//           <select value={mode} onChange={e => setMode(e.target.value as 'json' | 'text')} className={styles.select}>
//             <option value="json">JSON</option>
//             <option value="text">Plain Text</option>
//           </select>

//           {mode === 'json' && (
//             <>
//               <button onClick={handlePrettify} className={styles.prettifyButton}>
//                 Prettify
//               </button>
//               {!isEditing && (
//                 <button onClick={startEditing} className={styles.editButton}>
//                   Edit
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {isEditing ? (
//         <div className={styles.editContainer}>
//           <textarea
//             ref={textareaRef}
//             value={editValue}
//             onChange={e => setEditValue(e.target.value)}
//             className={styles.textarea}
//           />
//           <div className={styles.editButtons}>
//             <button onClick={saveEditing} className={styles.saveButton}>
//               Save
//             </button>
//             <button onClick={cancelEditing} className={styles.cancelButton}>
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div
//           className={`${styles.viewer} ${mode === 'json' ? styles.jsonViewer : ''}`}
//           onClick={mode === 'json' ? startEditing : undefined}
//           dangerouslySetInnerHTML={{ __html: mode === 'json' ? highlightJson(value) : value }}
//         />
//       )}
//     </div>
//   );
// }
