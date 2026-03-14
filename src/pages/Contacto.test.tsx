import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import React from 'react'; 
import Contacto from './Contacto';

vi.mock('@formspree/react', () => ({
  useForm: () => [
    { succeeded: false, submitting: false, errors: null },
    vi.fn(),
    vi.fn()
  ],
  ValidationError: () => React.createElement('div', { 'data-testid': 'validation-error' })
}));

vi.mock('framer-motion', () => {
  const createMockComponent = (name: string) => (props: Record<string, unknown>) => {
    const cleanProps = { ...props };
    const forbidden = [
      'whileInView', 'whileHover', 'initial', 'animate', 
      'viewport', 'variants', 'transition', 'exit', 'layout'
    ];
    forbidden.forEach(key => delete cleanProps[key]);
    
    return React.createElement(name, cleanProps);
  };

  return {
    motion: {
      div: createMockComponent('div'),
      section: createMockComponent('section'),
      button: createMockComponent('button'),
      span: createMockComponent('span'),
      img: createMockComponent('img'),
      a: createMockComponent('a'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
  };
});

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