import { DataTypes } from 'sequelize';
import Comment from './comment';
import User from './user';
import db from '../db';

const Topic = db.define('Topic', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

Topic.hasMany(Comment, {
    onDelete: 'CASCADE',
});
Topic.belongsTo(User);

export default Topic;
