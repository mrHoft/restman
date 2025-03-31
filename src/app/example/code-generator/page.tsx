import { CodeGenerator } from '~/widgets/codeGenerator/generator';

const example = {
  method: 'POST',
  url: 'https://jsonplaceholder.typicode.com/posts',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Page() {
  return (
    <>
      <h2>Code generator example</h2>
      <CodeGenerator {...example} />
    </>
  );
}
