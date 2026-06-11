import { vi } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import es from './i18n/es.json';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const keys = key.split('.');
      let value: unknown = es;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof value === 'string' ? value : key;
    },
    i18n: { language: 'es', changeLanguage: vi.fn() },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
}));

window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

window.scrollTo = vi.fn();

window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
window.HTMLMediaElement.prototype.pause = vi.fn();
window.HTMLMediaElement.prototype.load = vi.fn();

const createMockComponent = (name: string) => (props: { children?: React.ReactNode; [key: string]: unknown }) => {
  const { children, ...rest } = props;
  const forbidden = [
    'whileInView', 'whileHover', 'initial', 'animate',
    'viewport', 'variants', 'transition', 'exit', 'layout'
  ];
  forbidden.forEach(key => delete rest[key]);
  return React.createElement(name, rest, children);
};

vi.mock('framer-motion', () => ({
  motion: {
    div: createMockComponent('div'),
    section: createMockComponent('section'),
    h1: createMockComponent('h1'),
    h2: createMockComponent('h2'),
    h3: createMockComponent('h3'),
    h4: createMockComponent('h4'),
    p: createMockComponent('p'),
    a: createMockComponent('a'),
    span: createMockComponent('span'),
    img: createMockComponent('img'),
    button: createMockComponent('button'),
    nav: createMockComponent('nav'),
    header: createMockComponent('header'),
    footer: createMockComponent('footer'),
    main: createMockComponent('main'),
    article: createMockComponent('article'),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  useReducedMotion: () => false,
  useScroll: () => ({ scrollYProgress: { on: vi.fn(), get: vi.fn(() => 0) } }),
  useTransform: () => ({ on: vi.fn(), get: vi.fn(() => 0) }),
}));