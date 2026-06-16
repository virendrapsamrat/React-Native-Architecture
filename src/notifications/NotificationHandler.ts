import { logger } from '../utils/logger';

type NotificationHandler = (data: Record<string, unknown>) => void;

export const NotificationHandler = {
  handlers: new Map<string, NotificationHandler>(),

  register: (type: string, handler: NotificationHandler) => {
    NotificationHandler.handlers.set(type, handler);
  },

  handle: (data: Record<string, unknown>) => {
    const type = data.type as string;
    const handler = NotificationHandler.handlers.get(type);
    if (handler) {
      handler(data);
    } else {
      logger.warn(`No handler for notification type: ${type}`);
    }
  },
};
