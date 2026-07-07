/**
 * Centralized API Configuration
 * Single source of truth for all API endpoints
 */

const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:3000';
};

const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  BASE_URL: getApiBaseUrl(),
  FAQ: '/faq',
  SERVICES: '/service',
  CONTACT: '/contact',
  UPLOAD: '/seb',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

/**
 * Environment flags
 */
export const ENV = {
  isDevelopment: isDevelopment(),
  isProduction: isProduction(),
  apiUrl: getApiBaseUrl(),
} as const;

/**
 * Safe console logger (only logs in development)
 */
export const logger = {
  log: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.log('[NEB]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.error('[NEB ERROR]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (ENV.isDevelopment) {
      console.warn('[NEB WARNING]', ...args);
    }
  },
};

export default {
  API_ENDPOINTS,
  API_CONFIG,
  ENV,
  logger,
};
