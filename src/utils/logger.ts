type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const log = (level: LogLevel, message: string, ...args: unknown[]) => {
  if (__DEV__) {
    const prefix = `[${level.toUpperCase()}]`;
    console[level === 'debug' ? 'log' : level](prefix, message, ...args);
  }
};

export const logger = {
  debug: (message: string, ...args: unknown[]) => log('debug', message, ...args),
  info: (message: string, ...args: unknown[]) => log('info', message, ...args),
  warn: (message: string, ...args: unknown[]) => log('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => log('error', message, ...args),
};
