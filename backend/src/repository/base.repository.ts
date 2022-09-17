import { Injectable } from '@nestjs/common';
import { Client, mapping } from 'cassandra-driver';

@Injectable()
export class BaseRepository {
  client: Client;
  mapper: mapping.Mapper;
  private createClient() {
    const client = new Client({
      contactPoints: ['cassandra:9042'],
      keyspace: 'urlshortener',
      localDataCenter: 'datacenter1',
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
