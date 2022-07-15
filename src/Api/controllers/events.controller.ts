// ** Controller for route /api/events
import { Request, Response } from 'express';
// @ts-ignore
import { ObjectID } from 'mongodb';

import container from '../../inversify.config';
import { EventService, UserService } from '../../Application/Services/Model';
import TYPES from '../../types';
import { Event } from '../../Domain/Entities/Models';
import { UserDto } from '../../Application/DTO';

export const getEvents = async (req: Request, res: Response) => {
  const eventService = container.get<EventService>(TYPES.EventService);
  const events = await eventService.getEvents();
  res.send({
    events,
  });
};

export const getEvent = async (
  req: Request,
  res: Response,
) => {
  const eventService = container.get<EventService>(TYPES.EventService);

  const id = new ObjectID(req.params.id);

  const event = await eventService.getEvent(id);
  res.send({
    event,
  });
};

export const createEvent = async (
  req: Request,
  res: Response,
) => {
  const eventService = container.get<EventService>(TYPES.EventService);
  const userService = container.get<UserService>(TYPES.UserService);
  const {
    title, notes, start, end,
  }: Event = req.body;
  // @ts-ignore
  const { uid } = req;

  const user = await userService.getUserById(uid);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const userDto: UserDto = {
    _id: user._id,
    name: user.name,
  };

  const payload = {
    title,
    notes,
    start,
    end,
    user: userDto,
  };

  const event = await eventService.createEvent(payload);

  return res.send({
    title: event.title,
    notes: event.notes,
    start: event.start,
    end: event.end,
    user: event.user,
    _id: event._id,
  });
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventService = container.get<EventService>(TYPES.EventService);
  const id: ObjectID = new ObjectID(req.params.id);

  const {
    title,
    notes,
    start,
    end,
  }: Event = req.body;

  const event = await eventService.getEvent(id);
  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  const payload: any = {
    _id: id,
  };

  if (title) {
    payload.title = title;
  }

  if (notes) {
    payload.notes = notes;
  }

  if (start) {
    payload.start = start;
  }

  if (end) {
    payload.end = end;
  }

  await eventService.updateEvent(payload);

  return res.send({
    event,
  });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventService = container.get<EventService>(TYPES.EventService);
  const id: ObjectID = new ObjectID(req.params.id);

  const event = await eventService.getEvent(id);
  if (!event) {
    return res.status(404).json({
      message: 'Event not found',
    });
  }

  await eventService.deleteEvent(id);

  return res.send({
    event,
  });
};
