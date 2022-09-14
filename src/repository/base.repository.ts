import { Injectable } from '@nestjs/common';
import { Client, mapping, auth } from 'cassandra-driver';
import async from 'async';

@Injectable()
export class BaseRepository {
  client: Client;
  mapper: mapping.Mapper;
  private createClient() {
    const client = new Client({
      contactPoints: ['localhost:9042'],
      keyspace: 'urlshortener',
      localDataCenter: 'datacenter1',
      // authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra'),
    });
    this.client = client;
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
