import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from './header';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/test',
  useParams: () => ({
    locale: 'en',
  }),
}));

describe('Header', () => {
  it('renders a component with right heading', () => {
    const { getByRole } = render(<Header user={null} />);

    expect(getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
