import React, { useState } from 'react';
import {
    Form, Button, Container, Card, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import * as Validators from '../../validators';
import { Cars } from '../../components/Cars';
import { Input } from '../../components/Input';
import { signIn } from '../../controllers/authorization';
import { ROUTES } from '../../index';

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
            const response = await signIn({ login, password });
            if (response.status) {
                navigate(ROUTES.GAME);
            } else {
                setError(response.message);
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
                        <Input
                            label="Login"
                            name="login"
                            type="text"
                            status="normal"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            isValid={
                                !!(!formik.errors.login && formik.touched.login)
                            }
                            isInvalid={
                                !!(formik.errors.login && formik.touched.login)
                            }
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            status="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            isValid={
                                !!(
                                    !formik.errors.password
                                    && formik.touched.password
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.password
                                    && formik.touched.password
                                )
                            }
                        />
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button
                            className="w-100 mb-1"
                            variant="success"
                            type="submit"
                        >
                            Sign In
                        </Button>
                        <Link to={ROUTES.SIGN_UP}>
                            Don&apos;t have an account?
                        </Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};
