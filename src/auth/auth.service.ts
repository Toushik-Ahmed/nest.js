import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import authConfig from './config/auth.config';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ActiveUserType } from './interfaces/active-user-type';
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
    return this.generateToken(user);
  }

  private async signToken<T>(userId: number, expiresIn: string, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: parseInt(expiresIn),
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer,
      },
    );
  }

  private async generateToken(user: User) {
    const accessTOken = await this.signToken<Partial<ActiveUserType>>(
      user.id,
      this.authConfiguration.expiresIn as string,
      { email: user.email },
    );

    const refreshToken = await this.signToken(
      user.id,
      this.authConfiguration.refreshTokenExpiration as string,
    );

    return {
      accessTOken,
      refreshToken,
    };
  }

  public async refreshToken(refreshToken: RefreshTokenDto) {
    try {
      // verify the refresh token
      const { sub } = await this.jwtService.verifyAsync(
        refreshToken.refreshToken,
        {
          secret: this.authConfiguration.secret,
          audience: this.authConfiguration.audience,
          issuer: this.authConfiguration.issuer,
        },
      );

      //find the user from the db
      const user = await this.usersService.findUserById(sub);

      //generate new access token and refresh token

      return await this.generateToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
