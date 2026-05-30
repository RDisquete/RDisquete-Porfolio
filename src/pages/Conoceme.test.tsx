import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Conoceme from './Conoceme';

test('Conoceme debe renderizar la información principal', () => {
  render(
    <MemoryRouter>
      <Conoceme />
    </MemoryRouter>
  );

  expect(screen.getByText(/README.md/i)).toBeDefined();

  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeDefined();
});