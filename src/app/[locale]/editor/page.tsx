import CodeEditor from '~/widgets/codeEditor/editor';

const example1 = `{
  "value1": "ggg",
  "value2": 5,
  "value3": 56
}`;

const example2 = `<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
  </head>
  
  <body className="body">
    <main>
      <h1>Example</h1>
    </main>
  </body>

</html>
`;

export default function Page() {
  return (
    <>
      <CodeEditor name="body" value={example1} />
      <CodeEditor name="result" value={example2} readonly prettify />
    </>
  );
}
