export const TypeOrmConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5403,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  entities: [__dirname + '/entity/*{.ts,.js}'],
  synchronize: true,
};
