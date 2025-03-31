import React from 'react';
import { Message } from '../components/message/message';

const getLineNumber = (i: number) => {
  const n = (i + 1).toString();
  const label = ' '.repeat(3 - n.length);
  return <span style={{ color: '#888' }}>{`${label}${n}  `} </span>;
};

export function PrettyJson({ data }: { data: string }) {
  const parsed = (() => {
    try {
      const json = JSON.parse(data);
      const parsed = JSON.stringify(json, null, 2).split('\n');
      return parsed;
    } catch {
      return null;
    }
  })();

  if (!parsed) {
    return <pre>{data}</pre>;
  }

  const prettifyLine = (line: string) => {
    const regex = /"([^"]+)": /g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const space = ' '.repeat(index);
      const rest = line.slice(index + match[0].length);
      let restElement: React.ReactNode = rest;
      if (rest.charCodeAt(0) >= 48 && rest.charCodeAt(0) <= 57) {
        restElement = <span style={{ color: 'var(--code-number)' }}>{rest}</span>;
      }
      if (rest[0] === '"' || rest[0] === 'n') {
        restElement = <span style={{ color: 'var(--code-string)' }}>{rest}</span>;
      }
      return (
        <>
          {space}
          <span style={{ color: 'var(--code-tag)' }}>{match[0]}</span>
          {restElement}
        </>
      );
    }
    return line;
  };

  return (
    <pre>
      {parsed.map((line, i) => (
        <div key={i}>
          {getLineNumber(i)}
          {prettifyLine(line)}
        </div>
      ))}
    </pre>
  );
}

export function PrettyHtml({ data }: { data: string }) {
  const lines = data.split('\n');
  const prettifyLine = (line: string): React.ReactNode => {
    const regex = /<([^>]+)>/g;
    const match = line.match(regex);
    if (match) {
      const index = line.indexOf(match[0]);
      const prev = line.slice(0, index);
      const rest = line.slice(index + match[0].length);
      const last = prettifyLine(rest);
      return (
        <>
          {prev}
          <span style={{ color: 'var(--code-tag)' }}>{match[0]}</span>
          {last}
        </>
      );
    }
    return line;
  };

  return (
    <pre>
      {lines.map((line, i) => (
        <div key={i}>
          {getLineNumber(i)}
          {prettifyLine(line)}
        </div>
      ))}
    </pre>
  );
}

export function prettify(data: string) {
  if (data.startsWith('{') || data.startsWith('[')) {
    return { format: 'JSON', result: <PrettyJson data={data} /> };
  }
  if (data.startsWith('<')) {
    return { format: 'HTML', result: <PrettyHtml data={data} /> };
  }
  return { format: 'plain', result: <pre>{data}</pre> };
}

export const tryParseJson = (data: string) => {
  try {
    return JSON.stringify(JSON.parse(data), null, 2);
  } catch {
    Message.show('Invalid JSON', 'error');
    return null;
  }
};
