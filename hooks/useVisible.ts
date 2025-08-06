import { useToggle } from '@uidotdev/usehooks';
import { useCallback } from 'react';

/**
 * A custom hook to manage a boolean state with toggle functionality.
 * Basically a wrapper around useHooks' useToggle to provide specific callbacks
 * for visible and invisible states.
 * @param initialState The initial state of the boolean, defaults to false.
 */
export function useVisible(initialState: boolean = false) {
  const [visible, toggle] = useToggle(initialState);

  const show = useCallback(() => {
    toggle(true);
  }, [toggle]);

  const hide = useCallback(() => {
    toggle(false);
  }, [toggle]);

  return {
    visible,
    show,
    hide,
    toggle,
  };
}
