import { CustomError } from './custom-error';
import { NOT_AUTHORIZED } from "../messages/messages";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super(NOT_AUTHORIZED);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: NOT_AUTHORIZED }];
  }
}
