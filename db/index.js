import pgPromise from 'pg-promise';

const pgp = pgPromise();

const createSingleton = (name, create) => {
  const s = Symbol.for(name);
  let scope = global[s];
  if (!scope) {
    scope = { ...create() };
    global[s] = scope;
  }
  return scope;
};

export const client = () =>
  createSingleton('db', () => {
    const cn = {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        max: 5,
    };
    return pgp(cn);
});