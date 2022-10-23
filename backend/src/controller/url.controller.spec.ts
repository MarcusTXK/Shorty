import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';

import { UrlController } from './url.controller';
import { UrlService } from '../service/url.service';
import { Url } from '../models/url.model';
import { UrlRepository } from '../repository/url.repository';
import { BaseRepository } from '../repository/base.repository';
import { GetUrlDto } from '../dto/url/get-url.dto';
import { CreateUrlDto } from '../dto/url/create-url.dto';
import { UpdateUrlDto } from 'src/dto/url/update-url.dto';

describe('UrlController', () => {
  let urlController: UrlController;
  let urlService: UrlService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [BaseRepository, UrlRepository, UrlService],
    }).compile();

    urlController = moduleRef.get<UrlController>(UrlController);
    urlService = moduleRef.get<UrlService>(UrlService);
  });

  describe('getUrls', () => {
    it('should return an array of urls', async () => {
      const mockUrls: Url[] = [
        {
          shortUrl: '9020e2e',
          email: 'user@gmail.com',
          originalUrl: 'https://www.withoutpassword.com',
          password: null,
        },
        {
          shortUrl: 'custom',
          email: 'user2@gmail.com',
          originalUrl: 'https://www.withoutpassword.com',
          password: null,
        },
      ];
      jest
        .spyOn(urlService, 'getAllUrls')
        .mockImplementation(() => Promise.resolve(mockUrls));
      expect(await urlController.getUrls()).toBe(mockUrls);
    });
  });

  describe('getUrlById', () => {
    it('should return a url if id exists', async () => {
      const shortUrl = '9020e2e';
      const mockUrl: GetUrlDto = {
        originalUrl: 'https://www.withoutpassword.com',
        hasPassword: false,
      };
      jest.spyOn(urlService, 'getUrlByShortUrl').mockImplementation((id) => {
        if (id === shortUrl) {
          return Promise.resolve(mockUrl);
        }
        return null;
      });
      expect(await urlController.getUrlById('wrong')).toBe(null);
      expect(await urlController.getUrlById(shortUrl)).toBe(mockUrl);
    });
  });

  describe('createUrl', () => {
    it('should create a new url if valid', async () => {
      const validUrl: CreateUrlDto = {
        originalUrl: 'https://www.withoutpassword.com',
      };
      const invalidUrl: CreateUrlDto = {
        originalUrl: 'invalidUrl',
      };
      const shortUrl = { shortUrl: '123' };
      jest
        .spyOn(urlService, 'createUrl')
        .mockImplementation(() => Promise.resolve(shortUrl));
      // valid url
      expect(await urlController.createUrl(validUrl)).toBe(shortUrl);
      // invalid url (caught via validations)
      expect(
        async () => await urlController.createUrl(invalidUrl),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('loginByShortUrl', () => {
    it('should return original url if password is correct', async () => {
      const shortUrl = '9020e2e';
      const mockUrl: GetUrlDto = {
        originalUrl: 'https://www.withpassword.com',
      };
      jest
        .spyOn(urlService, 'loginByShortUrl')
        .mockImplementation(() => Promise.resolve(mockUrl));
      // valid url
      expect(
        await urlController.loginByShortUrl(shortUrl, { password: 'secret' }),
      ).toBe(mockUrl);
      // missing password (caught via validations)
      expect(
        async () =>
          await urlController.loginByShortUrl(shortUrl, {
            missing: 'password',
          } as any),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateUrlById', () => {
    it('should update url with new details', async () => {
      const shortUrl = '9020e2e';
      const validUrl: UpdateUrlDto = {
        customUrl: 'short',
        originalUrl: 'https://www.withoutpassword.com',
      };
      const invalidUrl: UpdateUrlDto = {
        customUrl: 'thisIsWayTooLongForAShortUrl',
        originalUrl: 'https://www.withoutpassword.com',
      };
      const output = [];
      jest
        .spyOn(urlService, 'updateUrlByShortUrl')
        .mockImplementation(() => Promise.resolve(output));
      // valid url
      expect(await urlController.updateUrlById(shortUrl, validUrl)).toBe(
        output,
      );
      // too long custom url (caught via validations)
      expect(
        async () => await urlController.updateUrlById(shortUrl, invalidUrl),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('deleteUrlById', () => {
    it('should delete url with id', async () => {
      const shortUrl = '9020e2e';
      const output = [];
      jest
        .spyOn(urlService, 'deleteByShortUrl')
        .mockImplementation(() => Promise.resolve(output));
      expect(await urlController.deleteUrlById(shortUrl)).toBe(output);
    });
  });
});
