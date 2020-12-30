


/**
 * Main config file used throughout the application
 * @module config
 * @author MT
 */
const config = {
    port: process.env.PORT || 9000,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: process.env.LOG_LEVEL || 'info',

    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 5432,
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'root',
    dbDB: process.env.DB_DATABASE || 'feeds',

    redisPort: process.env.REDIS_PORT || 6379,
    redisHost: process.env.REDIS_HOST || 'localhost',
    password: process.env.password || ''
};
export default config;
