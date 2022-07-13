import path from 'path';
import { DataSource } from 'typeorm';
import { injectable } from 'inversify';

import { DB_HOST_PARSED } from '../../libs/config';

import { DbManager as DbManagerModel } from './Model';

const cwd = process.cwd();

const NODE_ENV = process.env.NODE_ENV || 'development';

const source = NODE_ENV === 'development' ? 'src' : 'dist';

const entitiesPath = path.join(cwd, source, 'Domain', 'Entities');

@injectable()
export default class DbManager implements DbManagerModel {
  readonly #dataSource: DataSource;

  constructor() {
    this.#dataSource = new DataSource({
      type: 'mongodb',
      url: DB_HOST_PARSED,
      database: 'calendar',
      connectTimeoutMS: 1000,
      useUnifiedTopology: true,
      entities: [`${entitiesPath}/*.entity.{js,ts}`],
    });
  }

  async start() {
    try {
      if (!this.#dataSource.isInitialized) {
        await this.#dataSource.initialize();
        console.log('DbManager: DataSource initialized');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async stop() {
    try {
      if (this.#dataSource.isInitialized) await this.#dataSource.destroy();
    } catch (err) {
      console.error(err);
    }
  }

  getDataSource() {
    return this.#dataSource;
  }
}
