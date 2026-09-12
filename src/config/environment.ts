export type AppEnvironment = 'development' | 'staging' | 'production';

const configs = {
  development: {apiBaseUrl: 'http://10.0.2.2:8080/api/v1'},
  staging: {apiBaseUrl: 'https://staging-api.enmostore.invalid/api/v1'},
  production: {apiBaseUrl: 'https://api.enmostore.invalid/api/v1'},
} as const;

const env = ((globalThis as {ENMO_ENV?: AppEnvironment}).ENMO_ENV ?? 'development') as AppEnvironment;
export const environment = {name: env, ...configs[env]};
