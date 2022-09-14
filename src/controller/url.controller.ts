import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CreateUrlDto, createUrlSchema } from 'src/dto/create-url.dto';
import { UpdateUrlDto, updateUrlSchema } from 'src/dto/update-url.dto';
import { Url } from 'src/models/url.model';
import { UrlService } from '../service/url.service';

// TODO hash password for update and delete
// TODO do not return password
// TODO only return originalUrl if no password
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // For testing purposes only
  @Get('url')
  async getUrls() {
    return await this.urlService.geUrls();
  }

  @Get('url/:shortUrl')
  async getUrlById(@Param('shortUrl') shortUrl: string) {
    return await this.urlService.getUrlByShortUrl(shortUrl);
  }

  @Post('url')
  async createUrl(@Body() urlDto: CreateUrlDto) {
    try {
      const { error, value } = createUrlSchema.validate(urlDto);
      if (error) {
        throw error;
      }
      const url: Url = {
        shortUrl: value.customUrl ? value.customUrl : value.originalUrl,
        originalUrl: value.originalUrl,
        email: value.email,
        password: value.password,
      };
      return await this.urlService.createUrl(url);
    } catch (e: any) {
      return e.message;
    }
  }

  @Put('url/:shortUrl')
  async updateUrlById(
    @Param('shortUrl') shortUrl: string,
    @Body() urlDto: UpdateUrlDto,
  ) {
    try {
      const { error, value } = updateUrlSchema.validate(urlDto);
      if (error) {
        throw error;
      }
      if (value.customUrl) {
        // Since unable to update PK, have to delete and create new
        if (await this.urlService.getUrlByShortUrl(value.customUrl)) {
          throw new Error('Short url already taken');
        }
        const toDelete = await this.urlService.getUrlByShortUrl(shortUrl);
        this.urlService.deleteByShortUrl(shortUrl);
        this.urlService.createUrl({ ...toDelete, ...value });
      } else {
        return await this.urlService.updateUrl(shortUrl, value);
      }
    } catch (e: any) {
      return e.message;
    }
  }
}
