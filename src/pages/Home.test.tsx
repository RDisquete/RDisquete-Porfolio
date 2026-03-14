import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('../components/Manifesto', () => ({ default: () => <div data-testid="manifesto-mock" /> }));
vi.mock('../components/ProyectosHome', () => ({ default: () => <div data-testid="proyectos-mock" /> }));
vi.mock('../components/Sobremi', () => ({ default: () => <div data-testid="sobremi-mock" /> }));

vi.mock('framer-motion', () => ({
    motion: {
      div: (props: Record<string, unknown>) => {
        const cleanProps = { ...props };
        
        const keysToFilter = [
          'whileInView', 'whileHover', 'initial', 'animate', 
          'viewport', 'variants', 'transition'
        ];
        
        keysToFilter.forEach(key => delete cleanProps[key]);
        
        return <div {...cleanProps} />;
      },
      img: (props: Record<string, unknown>) => {
        const cleanProps = { ...props };
        const keysToFilter = [
          'whileInView', 'whileHover', 'initial', 'animate', 
          'viewport', 'variants', 'transition'
        ];
        
        keysToFilter.forEach(key => delete cleanProps[key]);
        
        return <img {...cleanProps} />;
      },
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }));

test('Home debe renderizar todos sus bloques principales y el contenido base', () => {
  render(<Home />);

  expect(screen.getByTestId('manifesto-mock')).toBeDefined();
  expect(screen.getByTestId('proyectos-mock')).toBeDefined();
  expect(screen.getByTestId('sobremi-mock')).toBeDefined();

  // Verificamos branding
  expect(screen.getByText(/RAFA/i)).toBeDefined();
  expect(screen.getByText(/DORADO/i)).toBeDefined();
  expect(screen.getByText(/rdisquete/i)).toBeDefined();
});