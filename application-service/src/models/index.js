import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const sequelize = new Sequelize(
  {
      dialect: 'postgres',
      username: config.dbUser,
      password: config.dbPassword,
      database: config.dbDB,
      host: config.dbHost,
      port: config.dbPort,
      logging: console.log
  }
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
