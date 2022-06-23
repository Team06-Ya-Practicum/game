import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import User, { IUserModel } from './user';
import db from '../db';
import { ITopicModel } from './topic';

export interface ICommentDTO {
    TopicId: number
    content: string
    parent: number | null
    UserId: number
}

export interface ICommentModel extends
    Model<InferAttributes<ICommentModel>, InferCreationAttributes<ICommentModel>> {
    id: CreationOptional<number>
    parent: number | null
    content: string
    createdAt: Date
    updatedAt: Date
    UserId?: ForeignKey<IUserModel['id']>
    user: NonAttribute<IUserModel>
    TopicId?: ForeignKey<ITopicModel['id']>
}

const Comment = db.define<ICommentModel>('Comment', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
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
User.hasMany(Comment, {
    onDelete: 'CASCADE',
});

export default Comment;
