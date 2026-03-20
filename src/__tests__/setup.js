import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.Notification para useStreak
global.Notification = {
  permission: 'default',
  requestPermission: vi.fn().mockResolvedValue('granted'),
};

// Mock matchMedia (jsdom não suporta nativamente)
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

// Silencia warnings de console esperados nos testes
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes('[DevJourney]')) return; // nossa migration warning
  originalWarn(...args);
};
