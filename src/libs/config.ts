const {
  DB_PASSWORD, DB_HOST, DB_USER, SECRET_JWT_SEED,
} = process.env;

const DB_HOST_PARSED = DB_HOST?.replace('user', DB_USER ?? '')
  .replace('password', DB_PASSWORD ?? '');

export {
  DB_PASSWORD, DB_HOST_PARSED, DB_USER, SECRET_JWT_SEED,
};
