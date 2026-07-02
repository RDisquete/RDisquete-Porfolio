import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Contacto from './Contacto';

vi.mock('@formspree/react', () => ({
  useForm: () => [
    { succeeded: false, submitting: false, errors: null },
    vi.fn(),
    vi.fn()
  ],
  ValidationError: () => <div data-testid="validation-error" />
}));

describe('Contacto Component', () => {
  test('debe renderizar el formulario correctamente', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/TU NOMBRE.../i)).toBeDefined();
    expect(screen.getByPlaceholderText(/EMAIL.../i)).toBeDefined();
    expect(screen.getByPlaceholderText(/ESCRIBE TU IDEA.../i)).toBeDefined();
  });

  test('debe permitir escribir en el formulario', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const nombreInput = screen.getByPlaceholderText(/TU NOMBRE.../i) as HTMLInputElement;
    fireEvent.change(nombreInput, { target: { value: 'Rafael' } });
    expect(nombreInput.value).toBe('Rafael');
  });
});