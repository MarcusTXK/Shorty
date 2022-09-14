import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../repository/url.repository';
import { Url } from '../models/url.model';
import * as md5 from 'md5';
import { UpdateUrlDto } from 'src/dto/update-url.dto';

@Injectable()
export class UrlService {
  constructor(private urlRepository: UrlRepository) {}

  async geUrls() {
    return this.urlRepository.getUrls();
  }

  async getUrlByShortUrl(shortUrl: string) {
    return this.urlRepository.getUrlByShortUrl(shortUrl);
  }

  async createUrl(url: Url) {
    if (url.shortUrl != url.originalUrl) {
      return this.urlRepository.createUrl(url);
    } else {
      let counter = 0;
      let hash;
      let existingUrl;
      do {
        counter++;
        hash = md5(url.originalUrl + new Date().getTime() + counter).slice(
          0,
          7,
        );
        existingUrl = await this.urlRepository.getUrlByShortUrl(hash);
      } while (existingUrl.length !== 0);
      url.shortUrl = hash;
      return this.urlRepository.createUrl(url);
    }
  }

  async updateUrl(shortUrl: string, url: UpdateUrlDto) {
    return this.urlRepository.createUrl({ ...url, shortUrl: shortUrl });
  }

  async deleteByShortUrl(shortUrl: string) {
    return this.urlRepository.deleteByShortUrl(shortUrl);
  }
}
