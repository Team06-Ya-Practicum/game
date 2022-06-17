import { DataTypes } from 'sequelize';
import Topic from './topic';
import Comment from './comment';
import db from '../db';

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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

User.hasMany(Topic, {
    onDelete: 'CASCADE',
});
User.hasMany(Comment, {
    onDelete: 'CASCADE',
});

export default User;
