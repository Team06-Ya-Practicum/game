import React from 'react';
import {
    Container, Row, Col, Card, Button, Form,
} from 'react-bootstrap';
import { Cars } from 'components/Cars';

const data = {
    title: 'My new topic',
    user: 'Alex',
    content:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    createdAt: new Date(),
    comments: [
        {
            user: 'Foo',
            content: 'Super topic!',
            createdAt: new Date(),
        },
        {
            user: 'Alex',
            content:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
            createdAt: new Date(),
        },
    ],
};

export const ForumTopic = () => (
    <>
        <Cars />
        <Container className="p-2">
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Header className="text-center text-white">
                            {data.title}
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="text-white">
                                {data.content}
                            </Card.Text>
                            <Card.Text className="text-muted">
                                {`by ${
                                    data.user
                                } at ${data.createdAt.toDateString()}`}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Leave comment:</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Group className="text-center">
                                    <Button variant="success">
                                        Post a comment
                                    </Button>
                                </Form.Group>
                            </Form>
                            <Card.Text className="text-white">
                                Comments:
                            </Card.Text>
                            {data.comments.map((comment, index) => (
                                <Card.Text key={index} className="text-white">
                                    {`[${comment.createdAt.toDateString()}] ${
                                        comment.user
                                    }: ${comment.content}`}
                                </Card.Text>
                            ))}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
);
