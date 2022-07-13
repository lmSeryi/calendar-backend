import { Container } from 'inversify';
import TYPES from './types';

import { Event as EventModel, User as UserModel } from './Domain/Entities/Models';
import { Event, User } from './Domain/Entities';

import { DbManager as DbManagerModel } from './Infrastructure/DbManager/Model';
import { DbManager } from './Infrastructure/DbManager';

import {
  EventRepository as EventRepositoryModel,
  UserRepository as UserRepositoryModel,
} from './Infrastructure/Repositores/Models';
import { EventRepository, UserRepository } from './Infrastructure/Repositores';

import { EventService as EventServiceModel, UserService as UserServiceModel } from './Application/Services/Model';
import { EventService, UserService } from './Application/Services';

const container = new Container();

container.bind<DbManagerModel>(TYPES.DbManager).to(DbManager).inSingletonScope();

container.bind<UserModel>(TYPES.User).to(User);
container.bind<UserRepositoryModel>(TYPES.UserRepository).to(UserRepository);
container.bind<UserServiceModel>(TYPES.UserService).to(UserService);

container.bind<EventModel>(TYPES.Event).to(Event);
container.bind<EventRepositoryModel>(TYPES.EventRepository).to(EventRepository);
container.bind<EventServiceModel>(TYPES.EventService).to(EventService);

export default container;
