import { render, screen } from '@testing-library/react';
import VirtualizedHighlight from './VirtualizedHighlight';

test('renders learn react link', () => {
  render(<VirtualizedHighlight />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
