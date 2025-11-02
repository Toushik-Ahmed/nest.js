import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    gender?: string;
    isMarried: boolean;
    email: string;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      gender: 'male',
      isMarried: true,
      email: 'john@gamil.com',
    },
    {
      id: 2,
      name: 'Mark Doe',
      age: 50,
      gender: 'male',
      isMarried: true,
      email: 'mark@gamil.com',
    },
    {
      id: 4,
      name: 'Joice Doe',
      age: 50,
      gender: 'female',
      isMarried: false,
      email: 'joice@gmail.com',
    },
  ];

  getAllUser() {
    return this.users;
  }
  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  getUserByParams(id: number, age: number, name: string) {
    const result = this.users.find(
      (user) => user.id === id && user.age === age && user.name === name,
    );
    console.log('Result===>', result);
    return result;
  }

  getUsersByQuery(gender: string, isMarried: boolean) {
    console.log('isMarried===>', isMarried);
    return this.users.filter(
      (e) => e.gender === gender && e.isMarried === isMarried,
    );
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    gender?: string;
    isMarried: boolean;
    email: string;
  }) {
    this.users.push(user);
    return user;
  }
}
