module.exports = {
  type: 'mongodb',
  url: process.env.DB_URL, 
  synchronize: false,
  logging: true,
  entities: [
    'src/app/models/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/app/models',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
