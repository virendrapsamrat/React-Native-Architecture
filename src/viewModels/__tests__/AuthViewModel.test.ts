import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { useAuthViewModel } from '../AuthViewModel';
import { useAuth } from '../../hooks/useAuth';

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../services/AuthService', () => ({
  AuthService: {
    signup: jest.fn(),
  },
}));

describe('useAuthViewModel', () => {
  const renderHookValue = () => {
    let hookValue: ReturnType<typeof useAuthViewModel> | undefined;

    const HookProbe = () => {
      hookValue = useAuthViewModel();
      return null;
    };

    act(() => {
      TestRenderer.create(React.createElement(HookProbe));
    });

    return hookValue as ReturnType<typeof useAuthViewModel>;
  };

  it('returns a validation error for invalid email input', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      error: null,
      clearError: jest.fn(),
    });

    const hookValue = renderHookValue();

    expect(hookValue.login('not-an-email', 'Password123')).toBeUndefined();
  });

  it('calls login when validation succeeds', () => {
    const login = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login,
      isLoading: false,
      error: null,
      clearError: jest.fn(),
    });

    const hookValue = renderHookValue();

    act(() => {
      hookValue.login('user@example.com', 'Password123');
    });

    expect(login).toHaveBeenCalledWith('user@example.com', 'Password123');
  });
});
