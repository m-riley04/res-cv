import { Toast } from 'toastify-react-native';
import { MessageType } from './enums';

const DEFAULT_SHOW_DEBUG_MESSAGES = false;
const DEFAULT_LOG_MESSAGES_TO_CONSOLE = false;

export interface MessageServiceConfig {
  showDebugMessages: boolean;
  logMessagesToConsole: boolean;
}

/**
 * A singleton service that handles messaging and toast notifications.
 */
export class MessageService {
  static _instance: MessageService;

  // Prevent direct instantiation
  constructor() {
    if (MessageService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use MessageService.getInstance() instead of new.'
      );
    }
  }

  static getInstance() {
    if (!MessageService._instance) {
      MessageService._instance = new MessageService();
    }

    return this._instance;
  }

  private config: MessageServiceConfig = {
    showDebugMessages: DEFAULT_SHOW_DEBUG_MESSAGES,
    logMessagesToConsole: DEFAULT_LOG_MESSAGES_TO_CONSOLE,
  };

  /**
   * Routes a message to the appropriate toast notification style/type.
   * @param message The message to display.
   * @param type The type of message.
   */
  private routeMessage(msg: string, type: MessageType = MessageType.Info) {
    switch (type) {
      case MessageType.Info:
        Toast.info(msg);
        break;
      case MessageType.Error:
        Toast.error(msg);
        break;
      case MessageType.Warn:
        Toast.warn(msg);
        break;
      case MessageType.Success:
        Toast.success(msg);
        break;
      case MessageType.Debug:
        this.debug(msg);
        break;
    }
  }

  /**
   * Displays a message to the user.
   * @param msg The message to display.
   */
  message(msg: string, type: MessageType = MessageType.Info) {
    // Check if the message should be logged to the console
    if (this.config.logMessagesToConsole && type !== MessageType.Debug) {
      console.log(`[${type}] ${msg}`);
    }

    this.routeMessage(msg, type);
  }

  /**
   * Displays a debug message to the user.
   * @param msg The message to display.
   */
  debug(msg: string) {
    if (!this.config.showDebugMessages) {
      return;
    }

    if (this.config.logMessagesToConsole) {
      console.log(`[DEBUG] ${msg}`);
    }

    Toast.info(msg);
  }
}
