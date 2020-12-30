"use strict";

/**
 * Main config file used throughout the application
 * @module config
 * @author MT
 */
var config = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASSWORD || 'root',
  dbDB: process.env.DB_DATABASE || 'feeds'
};
exports["default"] = config;