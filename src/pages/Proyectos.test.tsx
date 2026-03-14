import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; 
import React from 'react';
import Proyectos from './Proyectos';

vi.mock('framer-motion', () => {
  const createMockComponent = (name: string) => (props: { children?: React.ReactNode, [key: string]: unknown }) => {
    const { children, ...rest } = props;
    const forbidden = [
      'whileInView', 'whileHover', 'initial', 'animate', 
      'viewport', 'variants', 'transition', 'exit', 'layout'
    ];
    forbidden.forEach(key => delete rest[key]);
    return React.createElement(name, rest, children);
  };

  return {
    motion: {
      div: createMockComponent('div'),
      section: createMockComponent('section'),
      button: createMockComponent('button'),
      img: createMockComponent('img'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
  };
});

test('El filtro de proyectos renderiza los elementos correctamente', () => {
  render(
    <MemoryRouter>
      <Proyectos />
    </MemoryRouter>
  );

  // Tus asserts aquí...
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toBeDefined();
});