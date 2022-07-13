// ** node modules
import path from 'path';

// ** external modules
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

// ** internal modules
import router from './routes';
import DbManager from '../Infrastructure/DbManager/DbManager';
import container from '../inversify.config';
import TYPES from '../types';

const cwd = process.cwd();
const publicPath = path.join(cwd, 'src', 'Infrastructure', 'public');

const PORT = process.env.PORT || 3001;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(publicPath));

const dbManager = container.get<DbManager>(TYPES.DbManager);
dbManager.start();

// setting api router
app.use('/api', router);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
