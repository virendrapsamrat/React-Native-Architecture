type LogoutHandler = () => void;

const handlers = new Set<LogoutHandler>();

export const logoutCoordinator = {
  registerHandler: (handler: LogoutHandler) => {
    handlers.add(handler);
    return () => handlers.delete(handler);
  },
  triggerLogout: () => {
    handlers.forEach((handler) => handler());
  },
};
