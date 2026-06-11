import { render, screen, waitFor } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('../components/Manifesto', () => ({ default: () => <div data-testid="manifesto-mock" /> }));
vi.mock('../components/ProyectosHome', () => ({ default: () => <div data-testid="proyectos-mock" /> }));
vi.mock('../components/Sobremi', () => ({ default: () => <div data-testid="sobremi-mock" /> }));

test('Home debe renderizar todos sus bloques principales y el contenido base', async () => {
  render(<Home />);

  await waitFor(() => {
    expect(screen.getByTestId('manifesto-mock')).toBeDefined();
    expect(screen.getByTestId('proyectos-mock')).toBeDefined();
    expect(screen.getByTestId('sobremi-mock')).toBeDefined();
  });

  expect(screen.getAllByText(/RAFA/i)).toHaveLength(2);
  expect(screen.getAllByText(/DORADO/i)).toHaveLength(2);
  expect(screen.getAllByText(/rdisquete/i)).toHaveLength(2);
});