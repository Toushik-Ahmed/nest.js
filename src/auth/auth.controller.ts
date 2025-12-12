import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AllowAnonymous } from './decorators/allow-anonymous.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @AllowAnonymous()
  @Post('signup')
  async signup(@Body() CreateUserDto: CreateUserDto) {
    return await this.authService.signup(CreateUserDto);
  }

  @AllowAnonymous()
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshTOken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
