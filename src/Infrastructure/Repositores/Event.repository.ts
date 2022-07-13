import { MongoEntityManager, ObjectID } from 'typeorm';
import { inject, injectable } from 'inversify';

import { EventRepository as EventRepositoryModel } from './Models';
import { Event as EventModel } from '../../Domain/Entities/Models';
import { Event } from '../../Domain/Entities';
import Types from '../../types';
import { DbManager } from '../DbManager/Model';
import { EventDto } from '../../Application/DTO';

@injectable()
export default class UserRepository implements EventRepositoryModel {
  readonly #mongoManager: MongoEntityManager;

  constructor(
    @inject(Types.DbManager) private dbManager: DbManager,
  ) {
    this.#mongoManager = new MongoEntityManager(dbManager.getDataSource());
  }

  async getEvent(id: ObjectID): Promise<EventModel | null> {
    console.log('id', id);
    return this.#mongoManager.findOneBy(Event, { _id: id });
  }

  async getEvents(): Promise<EventModel[]> {
    return this.#mongoManager.find(Event);
  }

  async createEvent(event: EventDto): Promise<EventModel> {
    return this.#mongoManager.save(Event, event);
  }

  async updateEvent(event: Partial<Event>): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest } = event;
    await this.#mongoManager.updateOne(
      Event,
      {
        _id,
      },
      {
        $set: rest,
      },
    );
  }

  async deleteEvent(id: ObjectID): Promise<void> {
    await this.#mongoManager.delete(Event, { _id: id });
  }
}
