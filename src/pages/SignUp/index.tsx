import React, { useState } from 'react';
import {
    Form, Button, Container, Card, Alert,
} from 'react-bootstrap';
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
            firstName: '',
            secondName: '',
            password: '',
            password_confirmation: '',
            phone: '',
        },
        validationSchema: Yup.object({
            login: Validators.loginValidator,
            email: Validators.emailValidator,
            firstName: Validators.nameValidator,
            secondName: Validators.nameValidator,
            password: Validators.passwordValidator,
            password_confirmation:
                Validators.passwordConfirmationValidator('password'),
            phone: Validators.phoneValidator,
        }),
        onSubmit: async ({
            login,
            email,
            firstName,
            secondName,
            password,
            phone,
        }) => {
            try {
                await axios.post(
                    '/api/auth/signup',
                    {
                        login,
                        email,
                        first_name: firstName,
                        second_name: secondName,
                        password,
                        phone,
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
                                    !!(
                                        formik.errors.email
                                        && formik.touched.email
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.email
                                        && formik.touched.email
                                    )
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
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!(
                                        formik.errors.firstName
                                        && formik.touched.firstName
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.firstName
                                        && formik.touched.firstName
                                    )
                                }
                            />
                            {formik.errors.firstName
                            && formik.touched.firstName ? (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.firstName}
                                    </Form.Control.Feedback>
                                ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                name="secondName"
                                value={formik.values.secondName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={
                                    !!(
                                        formik.errors.secondName
                                        && formik.touched.secondName
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.secondName
                                        && formik.touched.secondName
                                    )
                                }
                            />
                            {formik.errors.secondName
                            && formik.touched.secondName ? (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.secondName}
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
                                    !!(
                                        formik.errors.phone
                                        && formik.touched.phone
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.phone
                                        && formik.touched.phone
                                    )
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
                            {formik.errors.password
                            && formik.touched.password ? (
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
                                    !!(
                                        formik.errors.password_confirmation
                                        && formik.touched.password_confirmation
                                    )
                                }
                                isValid={
                                    !!(
                                        !formik.errors.password_confirmation
                                        && formik.touched.password_confirmation
                                    )
                                }
                            />
                            {formik.errors.password_confirmation
                            && formik.touched.password_confirmation ? (
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
