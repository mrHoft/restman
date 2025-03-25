import { Example } from '~/components/example/example';
import ThemeSwitcher from '~/components/theme/theme';

// TODO: remove
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1rem',
    background: 'var(--color10)',
    color: 'var(--color100)',
  },
};

export default function Home() {
  return (
    <>
      <header style={styles.header}>
        <h3>Restman</h3>
        <ThemeSwitcher />
      </header>
      <main className="main">
        <Example />
      </main>
    </>
  );
}
