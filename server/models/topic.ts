import {
    CreationOptional,
    DataTypes, ForeignKey,
    InferAttributes, InferCreationAttributes, Model, NonAttribute
} from 'sequelize';
import Comment from './comment';
import User, { IUserModel } from './user';
import db from '../db';

export interface ITopicDTO {
    title: string
    content: string
    UserId: number
}

export interface ITopicModel extends
    Model<InferAttributes<ITopicModel>, InferCreationAttributes<ITopicModel>> {
    id: CreationOptional<number>
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    UserId?: ForeignKey<IUserModel['id']>
    User: NonAttribute<IUserModel>
}

const Topic = db.define<ITopicModel>('Topic', {
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
Comment.belongsTo(Topic);

Topic.belongsTo(User);
User.hasMany(Topic, {
    onDelete: 'CASCADE',
});

export default Topic;
