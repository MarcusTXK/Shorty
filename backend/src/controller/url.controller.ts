import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
  Delete,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CreateUrlDto, createUrlSchema } from '../dto/url/create-url.dto';
import { LoginUrlDto, loginUrlSchema } from '../dto/url/login-url.dto';
import { UpdateUrlDto, updateUrlSchema } from '../dto/url/update-url.dto';
import { UrlService } from '../service/url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  // For testing purposes only
  @UseInterceptors(CacheInterceptor)
  @Get('url')
  async getUrls() {
    try {
      return await this.urlService.getAllUrls();
    } catch (e: any) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseInterceptors(CacheInterceptor)
  @Get('url/:shortUrl')
  async getUrlById(@Param('shortUrl') shortUrl: string) {
    try {
      return await this.urlService.getUrlByShortUrl(shortUrl);
    } catch (e: any) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // TODO valdiation, email should be from jwt
  @Get('url/email/:email')
  async getUrlsByEmail(@Param('email') email: string) {
    try {
      // TODO validate
      return await this.urlService.getUrlsByEmail(email);
    } catch (e: any) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('url')
  async createUrl(@Body() urlDto: CreateUrlDto) {
    try {
      const { error, value } = createUrlSchema.validate(urlDto);
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return await this.urlService.createUrl(value);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('url/:shortUrl')
  @HttpCode(HttpStatus.OK)
  async loginByShortUrl(
    @Param('shortUrl') shortUrl: string,
    @Body() urlDto: LoginUrlDto,
  ) {
    try {
      const { error, value } = loginUrlSchema.validate(urlDto);
      if (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return await this.urlService.loginByShortUrl(shortUrl, value.password);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      return await this.urlService.updateUrlByShortUrl(shortUrl, value);
    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpException) {
        throw e;
      }
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('url/:shortUrl')
  async deleteUrlById(@Param('shortUrl') shortUrl: string) {
    try {
      return await this.urlService.deleteByShortUrl(shortUrl);
    } catch (e: any) {
      console.error(e);
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
