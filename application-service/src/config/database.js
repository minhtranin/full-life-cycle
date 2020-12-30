const config = {
  development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_DATABASE || 'feeds',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      dialectOptions: {
          ssl: false
      },
      define: {
          charset: 'utf8',
          dialectOptions: {
              collate: 'utf8_general_ci'
          },
          timestamps: true
      }
  }
};
module.exports = config