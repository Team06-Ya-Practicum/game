import { DataTypes } from 'sequelize';
import User from './user';
import Topic from './topic';
import db from '../db';

const Comment = db.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
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

Comment.belongsTo(User);
Comment.belongsTo(Topic);

export default Comment;
