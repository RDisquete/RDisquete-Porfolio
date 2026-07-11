import React from "react";
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

test('renderiza el 404 y el mensaje de error', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByText('404')).toBeDefined();
  expect(screen.getByText('TRACK NOT FOUND')).toBeDefined();
  expect(screen.getByText(/vinilo saltó|vinyl skipped/)).toBeDefined();
});

test('tiene un enlace para volver al inicio', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole('link', { name: /VOLVER AL INICIO|BACK TO START/i });
  expect(homeLink).toBeDefined();
  expect(homeLink.getAttribute('href')).toBe('/');
});

test('establece el título de la página', () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  expect(document.title).toMatch(/no encontrada|not found/i);
});
