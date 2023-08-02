import { CustomError } from './custom-error';
import { ERR_NOT_FOUND } from "../messages/messages";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super(ERR_NOT_FOUND);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: ERR_NOT_FOUND }];
  }
}
