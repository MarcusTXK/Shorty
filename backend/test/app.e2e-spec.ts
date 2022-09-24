import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UrlController } from '../src/controller/url.controller';
import { BaseRepository } from '../src/repository/base.repository';
import { UrlRepository } from '../src/repository/url.repository';
import { UrlService } from '../src/service/url.service';

describe('UrlController (e2e)', () => {
  let app: INestApplication;
  const urlRepository = {
    getAllUrls: () => [
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
    ],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [BaseRepository, UrlRepository, UrlService],
    })
      .overrideProvider(UrlRepository)
      .useValue(urlRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET all urls`, () => {
    return request(app.getHttpServer())
      .get('/url')
      .expect(200)
      .expect(urlRepository.getAllUrls());
  });

  afterAll(async () => {
    await app.close();
  });
});
