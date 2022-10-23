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

  async getAllUrls() {
    return (await this.urlMapper.findAll()).toArray();
  }

  async getUrlsByEmail(email: string) {
    // TODO duplicate tables with email as PK instead since Cassandra does not support no PK Where filters, this is a temporary fix that does not scale well
    return (await this.urlMapper.findAll())
      .toArray()
      .filter((url) => url.email === email);
  }

  async getUrlByShortUrl(shortUrl: string) {
    return (await this.urlMapper.find({ shortUrl: shortUrl })).toArray();
  }

  async createUrl(url: Url) {
    return (await this.urlMapper.insert(url)).toArray();
  }

  async updateByShortUrl(url: Url) {
    const updatedFields = ['shortUrl'];
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
