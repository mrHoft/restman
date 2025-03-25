import { Example } from '~/components/example/example';
import { Header } from '~/components/header/header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="main">
        <Example />
      </main>
    </>
  );
}
