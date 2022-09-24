import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { Url } from '../models/url.model';
import { BaseRepository } from './base.repository';

const updatableFields = ['originalUrl', 'password'];

@Injectable()
export class UrlRepository implements OnModuleInit {
  constructor(private baseRepository: BaseRepository) {}

  urlMapper: mapping.ModelMapper<Url>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Url: {
          tables: ['url'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.urlMapper = this.baseRepository
      .createMapper(mappingOptions)
      .forModel('Url');
  }

  async getUrls() {
    return (await this.urlMapper.findAll()).toArray();
  }

  async getUrlByShortUrl(shortUrl: string) {
    return (await this.urlMapper.find({ shortUrl: shortUrl })).toArray();
  }

  async createUrl(url: Url) {
    return (await this.urlMapper.insert(url)).toArray();
  }

  async updateByShortUrl(url: Url) {
    const updatedFields = [];
    updatableFields.forEach((e) => {
      if (url[e]) {
        updatedFields.push(e);
      }
    });
    return (
      await this.urlMapper.update(url, {
        fields: updatedFields,
        ifExists: true,
      })
    ).toArray();
  }

  async deleteByShortUrl(shortUrl: string) {
    return (await this.urlMapper.remove({ shortUrl: shortUrl })).toArray();
  }
}
