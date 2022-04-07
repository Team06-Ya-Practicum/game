import React, { useState } from 'react';
import {
    Form, Button, Container, Card, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import axios from 'axios';
import * as Yup from 'yup';
import * as Validators from '../../validators';
import { Cars } from '../../components/Cars';

export const SignIn = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: Yup.object({
            login: Validators.loginValidator,
            password: Validators.passwordValidator,
        }),
        onSubmit: async ({ login, password }) => {
            try {
                await axios.post(
                    '/api/auth/signin',
                    {
                        login,
                        password,
                    },
                    { withCredentials: true },
                );
                navigate('/game');
            } catch (e: any) {
                setError(e.response.data.reason);
            }
        },
    });
    return (
        <Container
            className="d-flex flex-column mt-auto mb-auto justify-content-center align-items-center"
            fluid
        >
            <Cars />
            {error ? (
                <Alert variant="danger" className="w-25">
                    <Alert.Heading>Sign In Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            ) : null}
            <Card className="w-25">
                <Form onSubmit={formik.handleSubmit}>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                type="text"
                                name="login"
                                onChange={formik.handleChange}
                                value={formik.values.login}
                                isInvalid={
                                    !!(
                                        formik.errors.login
                                        && formik.touched.login
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.login
                                        && formik.touched.login
                                    )
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                isInvalid={
                                    !!(
                                        formik.errors.password
                                        && formik.touched.password
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.password
                                        && formik.touched.password
                                    )
                                }
                            />
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
};
