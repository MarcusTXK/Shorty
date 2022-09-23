import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import * as bcrypt from 'bcrypt';

import { UrlRepository } from '../repository/url.repository';
import { Url } from '../models/url.model';
import { UpdateUrlDto } from '../dto/update-url.dto';
import { SALT_ROUNDS } from '../const/constants';
import { GetUrlDto } from '../dto/get-url.dto';
import { CreateUrlDto } from '../dto/create-url.dto';

@Injectable()
export class UrlService {
  constructor(private urlRepository: UrlRepository) {}

  async geUrls() {
    return this.urlRepository.getUrls();
  }

  async getUrlByShortUrl(shortUrl: string): Promise<GetUrlDto> {
    const url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    const urlDto = new GetUrlDto();
    if (url.length === 0) {
      return null;
    }
    urlDto.hasPassword = url[0].password !== null;
    if (!urlDto.hasPassword) {
      urlDto.originalUrl = url[0].originalUrl;
    }
    return urlDto;
  }

  async loginByShortUrl(
    shortUrl: string,
    password: string,
  ): Promise<GetUrlDto> {
    const url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    if (url.length === 0) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, url[0].password);
    if (!isMatch) {
      return null;
    }
    return {
      originalUrl: url[0].originalUrl,
    };
  }

  async createUrl(url: CreateUrlDto) {
    const toCreate: Url = {
      shortUrl: url.customUrl ? url.customUrl : url.originalUrl,
      originalUrl: url.originalUrl,
      password: url.password,
    };

    if (url.customUrl) {
      if (
        (await this.urlRepository.getUrlByShortUrl(url.customUrl)).length !== 0
      ) {
        throw new Error('Short url already taken');
      }
      await this.urlRepository.createUrl(toCreate);
      return { shortUrl: url.customUrl };
    }

    // Generate unqiue hash for short url
    let counter = 0;
    let hash;
    let existingUrl;
    do {
      counter++;
      hash = md5(toCreate.originalUrl + new Date().getTime() + counter).slice(
        0,
        7,
      );
      existingUrl = await this.urlRepository.getUrlByShortUrl(hash);
    } while (existingUrl.length !== 0);
    toCreate.shortUrl = hash;
    if (toCreate.password) {
      toCreate.password = await bcrypt.hash(toCreate.password, SALT_ROUNDS);
    }
    await this.urlRepository.createUrl(toCreate);
    return { shortUrl: hash };
  }

  async updateUrlByShortUrl(shortUrl: string, url: UpdateUrlDto) {
    if (url.customUrl) {
      // Since unable to update PK, have to delete and create new
      if (
        (await this.urlRepository.getUrlByShortUrl(url.customUrl)).length != 0
      ) {
        throw new Error('Short url already taken');
      }
      const toDelete = await this.urlRepository.getUrlByShortUrl(shortUrl);
      if (toDelete.length === 0) {
        throw new Error('Short url not found');
      }
      this.urlRepository.deleteByShortUrl(shortUrl);
      console.log('combined', { ...toDelete[0], ...url });
      console.log('todleete', toDelete[0]);
      console.log('url', url);
      toDelete[0].shortUrl = url.customUrl;
      this.urlRepository.createUrl({ ...toDelete[0], ...url });
    } else {
      if (url.password) {
        url.password = await bcrypt.hash(url.password, SALT_ROUNDS);
      }
      return this.urlRepository.updateByShortUrl({
        ...url,
        shortUrl: shortUrl,
      });
    }
  }

  async deleteByShortUrl(shortUrl: string) {
    return this.urlRepository.deleteByShortUrl(shortUrl);
  }
}
