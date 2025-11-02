import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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
  @Get(':id/:age/:name')
  findUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('age', ParseIntPipe) age: number,
    @Param('name') name: string,
  ) {
    return this.usersService.getUserByParams(id, age, name);
  }

  @Get(':isMarried')
  getUserByMaritalStatus(@Param() param: GetUserParamDto) {
    console.log('isMarried===>', param.isMarried);
  }

  @Get()
  getUsersByQuery(@Query() query: any) {
    console.log('Query===>', query);
    return this.usersService.getUsersByQuery(query.gender, !!query.isMarried);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return 'A new user is created successfully';
  }

  @Patch()
  updateUser(@Body() user: UpdateUserDto) {
    console.log('Updated User Data===>', user);
  }
}
