"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
* Example model
* @module 
*/
function _default(sequelize, DataTypes) {
  var Crawler = sequelize.define('Crawler', {
    title: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    description: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    link: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    comments: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    pubDate: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    hash: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    tableName: 'crawler',
    underscored: true
  });
  return Crawler;
}