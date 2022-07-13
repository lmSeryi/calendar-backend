import { DataSource } from 'typeorm';

interface DbManager {

  start(): Promise<void>;

  stop(): Promise<void>;

  getDataSource(): DataSource;

}

export default DbManager;
