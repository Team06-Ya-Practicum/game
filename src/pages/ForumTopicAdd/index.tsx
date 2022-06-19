import React from 'react';
import {
    Container, Row, Col, Card, Button, Form,
} from 'react-bootstrap';
import { Cars } from 'components/Cars';

export const ForumTopicAdd = () => (
    <>
        <Cars />
        <Container className="p-2">
            <Row>
                <Col xs={12}>
                    <Card>
                        <Form>
                            <Card.Header className="text-center text-white">
                                Create new Topic
                            </Card.Header>
                            <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Content:</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button variant="success">
                                    Create new Topic
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
);
