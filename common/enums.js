const ResponseType = {
  ERROR: 0,
  SUCCESS_LIST: 1,
  SUCCESS_OBJ: 2,
  SUCCESS_EMPTY: 3,
  SESSION_EXPIRE: 4,
};

const UserErrorType = {
  CUSTOM: 0,
  EXISTING_USER: 1,
};

const QueueErrorType = {
  CUSTOM: 0,
  EXISTING_IN_QUEUE: 1,
};

const Sort = {
  ASD: 1,
  DES: -1,
};

const ListeningFor = {
  CUSTOM: 0,
  CLINIC_UPDATE: 1,
};

module.exports = {
  ResponseType,
  UserErrorType,
  QueueErrorType,
  Sort,
  ListeningFor,
};
