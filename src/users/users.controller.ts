import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
  ) {
    return this.usersService.getAllUser();
  }
  // // @Get(':id/:age/:name')
  // findUser(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Param('age', ParseIntPipe) age: number,
  //   @Param('name') name: string,
  // ) {
  //   return this.usersService.getUserByParams(id, age, name);
  // }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Get()
  getUsersByQuery(@Query() query: any) {
    console.log('Query===>', query);
    return this.usersService.getUsersByQuery(query.gender, !!query.isMarried);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
