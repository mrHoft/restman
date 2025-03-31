import { prettify } from '~/utils/pretty';

const example =
  '{"data":{"id":15,"documentId":"kx124vmsic5na03mr5m7qvgz","name":"Spoops","desc":"Spoops is a crustaceous/cephalopod-like robotic creature with a red shell armor, 2 purple tentacle-like appendages, and cream eyes hidden inside their shell.\\nTheir shell also has two anteanne-like extensions, featuring a cyan pattern, possibly glass or some unknown mechanical component.","createdAt":"2025-01-28T19:04:38.511Z","updatedAt":"2025-01-28T19:04:38.511Z","publishedAt":"2025-01-28T19:04:38.569Z","occupation":"Minion","cover":{"id":13,"documentId":"fkczjjlvq49hdceysioh695l","name":"Spoops.webp","alternativeText":null,"caption":null,"width":194,"height":194,"formats":{"thumbnail":{"ext":".webp","url":"/uploads/thumbnail_Spoops_d716f5cdb9.webp","hash":"thumbnail_Spoops_d716f5cdb9","mime":"image/webp","name":"thumbnail_Spoops.webp","path":null,"size":5.97,"width":156,"height":156,"sizeInBytes":5966}},"hash":"Spoops_d716f5cdb9","ext":".webp","mime":"image/webp","size":6.8,"url":"/uploads/Spoops_d716f5cdb9.webp","previewUrl":null,"provider":"local","provider_metadata":null,"createdAt":"2025-01-28T18:58:30.707Z","updatedAt":"2025-01-28T18:58:30.707Z","publishedAt":"2025-01-28T18:58:30.708Z"},"gender":{"id":6,"documentId":"s9g2lhz1g32ox5slww6kpifr","createdAt":"2025-01-28T18:29:49.228Z","updatedAt":"2025-01-28T18:29:49.228Z","publishedAt":"2025-01-28T18:30:10.418Z","title":"none"},"species":{"id":2,"documentId":"z6he87ty316878790bo0aa69","title":"Unknown","createdAt":"2025-01-28T18:30:49.973Z","updatedAt":"2025-01-28T18:30:49.973Z","publishedAt":"2025-01-28T18:30:49.999Z"}},"meta":{}}';

export default function Page() {
  const { format, result } = prettify(example);

  return (
    <>
      <h2>{`Pretty ${format} example`}</h2>
      {result}
    </>
  );
}
