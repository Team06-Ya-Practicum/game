import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import * as Validators from '../../validators';
import { Cars } from '../../components/Cars';

export const SignUp = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            first_name: '',
            second_name: '',
            password: '',
            password_confirmation: '',
            phone: '',
        },
        validationSchema: Yup.object({
            login: Validators.loginValidator,
            email: Validators.emailValidator,
            first_name: Validators.nameValidator,
            second_name: Validators.nameValidator,
            password: Validators.passwordValidator,
            password_confirmation:
                Validators.passwordConfirmationValidator('password'),
            phone: Validators.phoneValidator,
        }),
        onSubmit: async ({
            login,
            email,
            first_name,
            second_name,
            password,
            phone,
        }) => {
            try {
                await axios.post(
                    '/api/auth/signup',
                    {
                        login,
                        email,
                        first_name,
                        second_name,
                        password,
                        phone,
                    },
                    { withCredentials: true }
                );
                navigate('/game');
            } catch (error) {
                setError(error.response.data.reason);
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
                    <Alert.Heading>Sign Up Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            ) : null}
            <Card className="w-25">
                <Form onSubmit={formik.handleSubmit}>
                    <Card.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.email && formik.touched.email
                                }
                                isValid={
                                    !formik.errors.email && formik.touched.email
                                }
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                type="text"
                                name="login"
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.login && formik.touched.login
                                }
                                isValid={
                                    !formik.errors.login && formik.touched.login
                                }
                            />
                            {formik.errors.login && formik.touched.login ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.login}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.first_name &&
                                    formik.touched.first_name
                                }
                                isValid={
                                    !formik.errors.first_name &&
                                    formik.touched.first_name
                                }
                            />
                            {formik.errors.first_name &&
                            formik.touched.first_name ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.first_name}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="second_name"
                                value={formik.values.second_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.second_name &&
                                    formik.touched.second_name
                                }
                                isValid={
                                    !formik.errors.second_name &&
                                    formik.touched.second_name
                                }
                            />
                            {formik.errors.second_name &&
                            formik.touched.second_name ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.second_name}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.phone && formik.touched.phone
                                }
                                isValid={
                                    !formik.errors.phone && formik.touched.phone
                                }
                            />
                            {formik.errors.phone && formik.touched.phone ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.phone}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.password &&
                                    formik.touched.password
                                }
                                isValid={
                                    !formik.errors.password &&
                                    formik.touched.password
                                }
                            />
                            {formik.errors.password &&
                            formik.touched.password ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password (repeat)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password_confirmation"
                                value={formik.values.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    formik.errors.password_confirmation &&
                                    formik.touched.password_confirmation
                                }
                                isValid={
                                    !formik.errors.password_confirmation &&
                                    formik.touched.password_confirmation
                                }
                            />
                            {formik.errors.password_confirmation &&
                            formik.touched.password_confirmation ? (
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password_confirmation}
                                </Form.Control.Feedback>
                            ) : null}
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
    );
};
