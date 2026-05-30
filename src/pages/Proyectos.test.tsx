import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Proyectos from './Proyectos';

test('El filtro de proyectos renderiza los elementos correctamente', () => {
  render(
    <MemoryRouter>
      <Proyectos />
    </MemoryRouter>
  );

  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeDefined();
});