import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Backdop } from './backdop';

describe('Backdop', () => {
  it('successful renders', () => {
    const { container } = render(<Backdop />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
