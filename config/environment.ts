import path from 'node:path';
import { config as loadDotEnv } from 'dotenv';

export const supportedEnvironments = ['local', 'qa', 'staging'] as const;

export type AppEnvironment = (typeof supportedEnvironments)[number];

export interface AppConfig {
  environment: AppEnvironment;
  webBaseUrl: string;
  apiBaseUrl: string;
}

function isSupportedEnvironment(
  value: string,
): value is AppEnvironment {
  return supportedEnvironments.includes(value as AppEnvironment);
}

function resolveEnvironment(): AppEnvironment {
  const requestedEnvironment = process.env.APP_ENV ?? 'qa';

  if (!isSupportedEnvironment(requestedEnvironment)) {
    throw new Error(
      [
        `Unsupported APP_ENV: "${requestedEnvironment}".`,
        `Supported values: ${supportedEnvironments.join(', ')}.`,
      ].join(' '),
    );
  }

  return requestedEnvironment;
}

function loadEnvironmentFile(environment: AppEnvironment): void {
  const filePath = path.resolve(process.cwd(), `.env.${environment}`);

  loadDotEnv({
    path: filePath,
    override: false,
    quiet: true,
  });
}

function requireUrl(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}.`,
    );
  }

  try {
    return new URL(value).toString();
  } catch {
    throw new Error(
      `Environment variable ${name} must contain a valid absolute URL.`,
    );
  }
}

export function createAppConfig(): Readonly<AppConfig> {
  const environment = resolveEnvironment();

  loadEnvironmentFile(environment);

  const appConfig: AppConfig = {
    environment,
    webBaseUrl: requireUrl(
      'WEB_BASE_URL',
      process.env.WEB_BASE_URL,
    ),
    apiBaseUrl: requireUrl(
      'API_BASE_URL',
      process.env.API_BASE_URL,
    ),
  };

  return Object.freeze(appConfig);
}