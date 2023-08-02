import { CustomError } from './custom-error';
import { ERR_DBCONNECT } from "../messages/messages";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = ERR_DBCONNECT;

  constructor() {
    super(ERR_DBCONNECT);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
