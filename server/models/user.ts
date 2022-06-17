import { DataTypes } from 'sequelize';
import { loginRegex, nameRegex, phoneRegex } from 'validators';
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
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: nameRegex,
        },
    },
    secondName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: nameRegex,
        },
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    login: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            is: loginRegex,
            notEmpty: true,
            len: [1, 20],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
        validate: {
            is: phoneRegex,
            len: [1, 20],
        },
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true,
        },
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

User.hasMany(Topic);
User.hasMany(Comment);

export default User;
