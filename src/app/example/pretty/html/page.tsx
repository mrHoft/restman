import { prettify } from '~/utils/pretty';

const example = `<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx/1.18.0 (Ubuntu)</center>
</body>
</html>
`;

export default function Page() {
  const { format, result } = prettify(example);

  return (
    <>
      <h2>{`Pretty ${format} example`}</h2>
      {result}
    </>
  );
}
