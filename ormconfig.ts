import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'db',
  username: 'node_calendar',
  password: 'nodecalendar123',
  host: '127.0.0.1',
  port: 5432,
  entities: ['dist/src/entity/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
