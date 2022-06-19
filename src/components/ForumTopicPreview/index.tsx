import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface IForumTopicPreviewProps {
    title: string;
    children: string;
    user: string;
    createdAt: Date;
}

export const ForumTopicPreview = ({
    title,
    children,
    user,
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
                {`by ${user} at ${createdAt.toDateString()}`}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
            <Button variant="warning">Read the Topic</Button>
        </Card.Footer>
    </Card>
);
