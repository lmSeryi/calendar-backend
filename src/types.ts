const TYPES = {
  DbManager: Symbol.for('DbManager'),

  User: Symbol.for('User'),
  UserService: Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),

  Event: Symbol.for('Event'),
  EventService: Symbol.for('EventService'),
  EventRepository: Symbol.for('EventRepository'),
};

export default TYPES;
