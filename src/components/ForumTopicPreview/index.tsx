import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';

interface IForumTopicPreviewProps {
    id: number;
    title: string;
    children: string;
    userId: number;
    createdAt: Date;
}

export const ForumTopicPreview = ({
    id,
    title,
    children,
    userId,
    createdAt,
}: IForumTopicPreviewProps) => (
    <Card className="mb-2">
        <Card.Header className="text-center text-white">{title}</Card.Header>
        <Card.Body>
            <Card.Text className="text-white">
                {children.length <= 80
                    ? children
                    : `${children.substring(0, 80)}...`}
            </Card.Text>
            <Card.Text className="text-muted">
                {`by ${userId} at ${createdAt.toDateString()}`}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
            <Link to={`${ROUTES.FORUM}/${id}`} className="btn btn-warning">
                Read the Topic
            </Link>
        </Card.Footer>
    </Card>
);
