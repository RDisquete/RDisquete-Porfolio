import React from "react";
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Conoceme from './Conoceme';

test('renderiza el título principal y la firma', () => {
  render(
    <MemoryRouter>
      <Conoceme />
    </MemoryRouter>
  );

  expect(screen.getByText(/README\.md/i)).toBeInTheDocument();
  expect(screen.getByText(/rdisquete/i)).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
});

test('renderiza la sección de skills con tecnologías clave', () => {
  render(
    <MemoryRouter>
      <Conoceme />
    </MemoryRouter>
  );

  expect(screen.getByText('TRACKLIST: Skills')).toBeInTheDocument();
  expect(screen.getByText('React & Next.js')).toBeInTheDocument();
  expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  expect(screen.getByText('TypeScript')).toBeInTheDocument();
  expect(screen.getByText('Framer Motion')).toBeInTheDocument();
});

test('renderiza experiencia laboral y formación académica', () => {
  render(
    <MemoryRouter>
      <Conoceme />
    </MemoryRouter>
  );

  expect(screen.getByText(/Frontend Developer & Audiovisual Creator/)).toBeInTheDocument();
  expect(screen.getByText(/Adv Estudio/)).toBeInTheDocument();
  expect(screen.getByText('Side A // 33 RPM')).toBeInTheDocument();
  expect(screen.getByText(/Desarrollo de 0 a producción/)).toBeInTheDocument();
  expect(screen.getAllByText(/Big School/)).toHaveLength(2);
});