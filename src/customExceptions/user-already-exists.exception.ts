import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(fieldName: string, fieldValue: string) {
    super(
      `user with fieldName ${fieldName} '${fieldValue}' already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
