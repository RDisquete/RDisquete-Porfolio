import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header';

vi.mock('../../hooks/useVinyl', () => ({
  useVinyl: () => ({ startAtmosphere: vi.fn() }),
}));

test('Header renderiza navegación principal', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByRole('navigation')).toBeDefined();
});

test('Header contiene enlace al inicio con aria-label', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const homeLink = screen.getByLabelText('Ir a la página de inicio');
  expect(homeLink).toBeDefined();
  expect(homeLink.getAttribute('href')).toBe('/');
});

test('Header contiene los enlaces de navegación', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText('About')).toBeDefined();
  expect(screen.getByText('Projects')).toBeDefined();
  expect(screen.getByText('Contact')).toBeDefined();
});

test('Header muestra botón de menú hamburguesa en móvil', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const menuButton = screen.getByLabelText('Abrir menú de navegación');
  expect(menuButton).toBeDefined();
});
