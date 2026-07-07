import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import { useAuthViewModel } from '../useAuthViewModel';
import { useAuth } from '../useAuth';

jest.mock('../useAuth', () => ({
  useAuth: jest.fn(),
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

    return () => hookValue as ReturnType<typeof useAuthViewModel>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('keeps invalid login input in the view-model boundary', () => {
    const login = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login,
      signup: jest.fn(),
      isLoading: false,
      error: null,
      clearError: jest.fn(),
    });

    const getHookValue = renderHookValue();

    act(() => {
      getHookValue().login('not-an-email', 'Password123');
    });

    expect(login).not.toHaveBeenCalled();
    expect(getHookValue().error).toBe('Invalid email address');
  });

  it('dispatches login when validation succeeds', () => {
    const login = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login,
      signup: jest.fn(),
      isLoading: false,
      error: null,
      clearError: jest.fn(),
    });

    const getHookValue = renderHookValue();

    act(() => {
      getHookValue().login('user@example.com', 'Password123');
    });

    expect(login).toHaveBeenCalledWith('user@example.com', 'Password123');
  });
});
