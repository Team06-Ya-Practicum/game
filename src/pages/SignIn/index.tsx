import React from 'react';
import {
    Form, Button, Container, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cars } from 'components/Cars';

export const SignIn = () => (
    <Container className="d-flex mt-auto mb-auto justify-content-center" fluid>
        <Cars />
        <Card className="w-25">
            <Form>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                </Card.Body>
                <Card.Footer className="text-center">
                    <Button
                        className="w-100 mb-1"
                        variant="success"
                        type="submit"
                    >
                        Sign In
                    </Button>
                    <Link to="/signup">Don&apos;t have an account?</Link>
                </Card.Footer>
            </Form>
        </Card>
    </Container>
);
