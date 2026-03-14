import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import React from 'react';
import Conoceme from './Conoceme';

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
      h2: createMockComponent('h2'),
      p: createMockComponent('p'),
      a: createMockComponent('a'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
  };
});

test('Conoceme debe renderizar la información principal', () => {
  render(<Conoceme />);

  expect(screen.getByText(/README.md/i)).toBeDefined();
  
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeDefined();
});