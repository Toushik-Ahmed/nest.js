import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersService } from '../users/users.service';
import authConfig from './config/auth.config';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hasingProvider: HashingProvider,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  public async login(loginDto: LoginDto) {
    //find the user with username
    let user = await this.usersService.findUserByEmail(loginDto.email);

    //if user is available then compare password

    let isEqual = false;
    isEqual = await this.hasingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('incorrect password');
    }

    //if the password mached retun login success and return access token
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: parseInt(this.authConfiguration.expiresIn as string),
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );

    return {
      token: token,
      message: 'login success',
      success: true,
    };
  }
}
