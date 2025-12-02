import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash password with salt
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
