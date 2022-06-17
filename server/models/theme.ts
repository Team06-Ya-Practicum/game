import { DataTypes } from 'sequelize';
import User from './user';
import db from '../db';

const Theme = db.define('Theme', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    theme: {
        type: DataTypes.ENUM('light', 'dark'),
        defaultValue: 'light',
        allowNull: false,
    },
});

Theme.belongsTo(User);

export default Theme;
