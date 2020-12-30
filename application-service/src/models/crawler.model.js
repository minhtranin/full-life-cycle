/**
* Example model
* @module 
*/

export default function (sequelize, DataTypes) {
    const Crawler = sequelize.define('Crawler', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        link: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pubdate: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        hashtable: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        timestamps: false
    }, {
        tableName: 'crawler',
        underscored: true,
        timestamps: false,
    });
    Crawler.removeAttribute('timestamps', 'created_at', 'updated_at');
    return Crawler;
}
