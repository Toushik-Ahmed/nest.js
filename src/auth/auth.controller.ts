import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() user: { email: string; password: string }) {}

  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.signup(CreateUserDto);
  }
}
