import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import db from '../db';

export interface IUserModel extends
    Model<InferAttributes<IUserModel>, InferCreationAttributes<IUserModel>> {
    id: number
    theme: CreationOptional<'light' | 'dark'>
    createdAt: Date
    updatedAt: Date
}

const User = db.define<IUserModel>('User', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
    },
    theme: {
        type: DataTypes.ENUM('light', 'dark'),
        defaultValue: 'light',
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

export default User;
