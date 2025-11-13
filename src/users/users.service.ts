import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  getAllUser() {
    return this.userRepository.find({
      relations: {
        profile: true,
      }, //include profile data with user
    });
  }
  getUserById(id: number) {}

  getUserByParams(id: number, age: number, name: string) {}

  getUsersByQuery(gender: string, isMarried: boolean) {}

  public async createUser(userDto: CreateUserDto) {
    userDto.profile = userDto.profile ?? {}; // ensure profile is at least an empty object

    //create user and link profile
    let user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
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
    return await this.userRepository.findOneBy({ id: userId }); // findOneBy will retrun a single object if use findBy it will return an array
  }
}
