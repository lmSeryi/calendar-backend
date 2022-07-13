import Joi from 'joi';

import { Event } from '../../Domain/Entities/Models';
import { optionalString, requiredString } from './validators';

const eventSchema = Joi.object<Event>({
  title: requiredString,
  notes: requiredString,
  start: requiredString,
  end: requiredString,
  bgColor: optionalString,
});

export default eventSchema;
