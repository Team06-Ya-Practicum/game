import React from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Page } from 'components/Page';
import { Cars } from 'components/Cars';

export const SignUp = () => (
    <Page>
        <Cars />
        <Container
            className="d-flex mt-auto mb-auto justify-content-center"
            fluid
        >
            <Card className="w-25">
                <Form>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password (repeat)</Form.Label>
                            <Form.Control type="password" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button
                            className="w-100"
                            variant="success"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        <Link to="/signin">Do you have an account?</Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    </Page>
);
