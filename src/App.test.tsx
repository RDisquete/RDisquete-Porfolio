import React from "react";
import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import App from './App';

vi.mock('./hooks/useVinyl', () => ({
  useVinyl: () => ({
    startAtmosphere: vi.fn(),
  }),
}));

test('La aplicación carga el layout principal', async () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeDefined(); 
  expect(screen.getByRole('contentinfo')).toBeDefined();
});