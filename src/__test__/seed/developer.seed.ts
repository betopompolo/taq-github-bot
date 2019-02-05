import * as Faker from 'faker';
import IORedis from 'ioredis';
import { Inject, Service } from 'typedi';
import { REDIS } from '@data/db';
import { Developer } from '@domain';

@Service()
export class DeveloperSeed {
  constructor(@Inject(REDIS) readonly redisClient: IORedis.Redis) {}

  async reset(): Promise<number> {
    const keys = await this.redisClient.keys('*');
    await Promise.all(keys.map(key => this.redisClient.del(key)));
    return keys.length;
  }

  createNewUser(id: number): Promise<string> {
    const newDeveloper: Developer = {
      developerId: id,
      issueId: +Faker.helpers.replaceSymbolWithNumber('####'),
      name: Faker.name.findName(),
      progress: null,
    };

    return this.redisClient.set(newDeveloper.developerId.toString(), JSON.stringify(newDeveloper));
  }

  getAllUsers(): Promise<string[]> {
    return this.redisClient.keys('*');
  }

  disconnect() {
    this.redisClient.disconnect();
  }
}
