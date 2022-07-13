import { ObjectID } from 'typeorm';
import { Event } from '../../../Domain/Entities/Models';
import { EventDto } from '../../DTO';

interface UserService {

  getEvent(id: ObjectID): Promise<Event | null>;

  getEvents(): Promise<Event[]>;

  createEvent(event: EventDto): Promise<Event>;

  updateEvent(event: Partial<Event>): Promise<void>;

  deleteEvent(id: ObjectID): Promise<void>;

}

export default UserService;
