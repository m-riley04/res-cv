import { useMemo } from 'react';
import { MessageService } from '../MessageService';

/**
 * A hook to access the message service easier.
 * @returns The message service instance.
 */
export function useMessages() {
  const messenger = useMemo(() => MessageService.getInstance(), []);
  return messenger;
}
