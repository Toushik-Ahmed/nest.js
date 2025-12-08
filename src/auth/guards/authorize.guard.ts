import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import authConfig from '../config/auth.config';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //0. Check if the route is marked as AllowAnonymous
    //*** this is  for to check if the requested route is public */
    let isPublic = this.reflector.getAllAndOverride('allowAnonymous', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    //1. Extract request from context
    const request: Request = context.switchToHttp().getRequest();

    //2.extract token from request headers
    const token = request.headers.authorization?.split(' ')[1];

    //3. vaidate token and provide /deny access
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
      );
      request['user'] = payload;
      console.log('payload:', payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
