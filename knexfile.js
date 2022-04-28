require('dotenv/config');

const { DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

module.exports = {

    development: {
      client: "mysql",
      connection: {
        host: DB_HOST,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'Users_corp',
        directory: './src/database/migrations'
      },
      useNullAsDefault: true,
    } 
}   