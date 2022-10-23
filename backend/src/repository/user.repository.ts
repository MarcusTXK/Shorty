import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { User } from '../models/user.model';
import { BaseRepository } from './base.repository';

const updatableFields = ['password', 'role'];

@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(private baseRepository: BaseRepository) {}

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        User: {
          tables: ['user'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.userMapper = this.baseRepository
      .createMapper(mappingOptions)
      .forModel('User');
  }

  async getAllUsers() {
    return (await this.userMapper.findAll()).toArray();
  }

  async getUserByEmail(email: string) {
    return (await this.userMapper.find({ email: email })).toArray();
  }

  async createUser(user: User) {
    return (await this.userMapper.insert(user)).toArray();
  }

  async updateUser(user: User) {
    const updatedFields = ['email'];
    updatableFields.forEach((e) => {
      if (user[e]) {
        updatedFields.push(e);
      }
    });
    return (
      await this.userMapper.update(user, {
        fields: updatedFields,
        ifExists: true,
      })
    ).toArray();
  }

  async deleteUserByEmail(email: string) {
    return (await this.userMapper.remove({ email: email })).toArray();
  }
}
