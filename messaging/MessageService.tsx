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
  static _messageService: MessageService;

  static getInstance() {
    if (MessageService._messageService === null) {
      MessageService._messageService = new MessageService();
    }

    return this._messageService;
  }

  private config: MessageServiceConfig = {
    showDebugMessages: DEFAULT_SHOW_DEBUG_MESSAGES,
    logMessagesToConsole: DEFAULT_LOG_MESSAGES_TO_CONSOLE,
  };

  public toast: typeof Toast = Toast;

  /**
   * Routes a message to the appropriate toast notification style/type.
   * @param message The message to display.
   * @param type The type of message.
   */
  private routeMessage(msg: string, type: MessageType = MessageType.Info) {
    switch (type) {
      case MessageType.Info:
        this.toast.info(msg);
        break;
      case MessageType.Error:
        this.toast.error(msg);
        break;
      case MessageType.Warn:
        this.toast.warn(msg);
        break;
      case MessageType.Success:
        this.toast.success(msg);
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

    this.toast.info(msg);
  }
}
