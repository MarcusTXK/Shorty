import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../repository/user.repository';
import { Role } from '../models/user.model';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { SALT_ROUNDS } from '../const/constants';
import { GetUserDto } from '../dto/user/get-user.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { generateAccessToken } from 'src/util/auth';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  async getUserByEmail(email: string): Promise<GetUserDto> {
    const user = await this.userRepository.getUserByEmail(email);

    if (user.length === 0) {
      return null;
    }
    return { email: user[0].email, role: user[0].role };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    // User does not exist or wrong password
    if (
      user.length === 0 ||
      !(await bcrypt.compare(password, user[0].password))
    ) {
      return null;
    }

    return generateAccessToken(user[0]);
  }

  async createUser(user: CreateUserDto) {
    if ((await this.userRepository.getUserByEmail(user.email)).length !== 0) {
      throw new Error('Email already taken');
    }
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    if (!user.role) {
      user.role = Role.Free;
    }
    return await this.userRepository.createUser(user);
  }

  async updateUser(email: string, user: UpdateUserDto) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
    return this.userRepository.updateUser({
      ...user,
      email: email,
    });
  }

  async deleteUserByEmail(email: string) {
    return this.userRepository.deleteUserByEmail(email);
  }
}
