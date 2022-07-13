import { inject, injectable } from 'inversify';

import type { ObjectID } from 'typeorm';
import TYPES from '../../types';

import { Event } from '../../Domain/Entities/Models';
import type { EventService as EventServiceModel } from './Model';
import { EventRepository } from '../../Infrastructure/Repositores/Models';
import { EventDto } from '../DTO';

@injectable()
export default class EventService implements EventServiceModel {
  constructor(
    @inject(TYPES.EventRepository) private eventRepository: EventRepository,
  ) {}

  public async getEvent(id: ObjectID): Promise<Event | null> {
    return this.eventRepository.getEvent(id);
  }

  public async getEvents(): Promise<Event[]> {
    return this.eventRepository.getEvents();
  }

  public async createEvent(event: EventDto): Promise<Event> {
    return this.eventRepository.createEvent(event);
  }

  public async updateEvent(event: Partial<Event>): Promise<void> {
    return this.eventRepository.updateEvent(event);
  }

  public async deleteEvent(id: ObjectID): Promise<void> {
    return this.eventRepository.deleteEvent(id);
  }
}
