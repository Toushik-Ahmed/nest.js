import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingProvider } from '../auth/provider/hashing.provider';
import { PaginationDto } from '../common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from '../common/pagination/pagination.provider';
import { UserAlreadyExistsException } from '../customExceptions/user-already-exists.exception';
import { Profile } from '../profile/profile.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private readonly paginatoinProvider: PaginationProvider,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async getAllUser(paginationDto: PaginationDto) {
    try {
      return this.paginatoinProvider.paginateQuery(
        paginationDto,
        this.userRepository,
        {},
        ['profile'],
      );
    } catch (error) {
      throw new RequestTimeoutException('An error has occured ');
    }
  }
  public async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
        tweets: true,
      },
    });
  }

  getUserByParams(id: number, age: number, name: string) {}

  getUsersByQuery(gender: string, isMarried: boolean) {}

  public async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile = userDto.profile ?? {}; // ensure profile is at least an empty object

      //check if a user exists with given data
      const existingUserWithUserName = await this.userRepository.findOne({
        where: [{ userName: userDto.userName }],
      });

      if (existingUserWithUserName) {
        throw new UserAlreadyExistsException('userName', userDto.userName);
      }

      const existingUserWithEmail = await this.userRepository.findOne({
        where: [{ email: userDto.email }],
      });

      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('userName', userDto.email);
      }

      //create user and link profile
      let user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
      });
      return this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED')
        throw new RequestTimeoutException('An error has occured ', {
          description: 'Could not connect to the database',
        });
      throw error;
    }
  }

  public async deleteUser(id: number) {
    //find user by id
    // const user = await this.userRepository.findOneBy({ id });
    // Delete user

    //*** when delete a user the associated profile will be deleted automatically due to onDelete: 'CASCADE' which is on profile entity ***//

    await this.userRepository.delete(id);
    //Delete profile
    // if (user?.profile) {
    //   await this.profileRepository.delete(user.profile?.id);
    //   console.log('Associated profile deleted:>>>>>>>>.');
    // }
    // console.log('Associated profile deleted:>>>>>>>>.');

    return {
      message: 'User and associated profile deleted successfully',
      deleted: true,
    };
  }

  public async findUserById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId }); // findOneBy will retrun a single object if use findBy it will return an array

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'The user was  not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }
}
