import React, { useState } from 'react';
import {
    Form, Button, Container, Card, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Validators from '../../validators';
import { Cars } from '../../components/Cars';
import { Input } from '../../components/Input';
import { signUp } from '../../controllers/authorization';
import { ROUTES } from '../../index';

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
            const response = await signUp({
                login,
                email,
                firstName,
                secondName,
                password,
                phone,
            });
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
                    <Alert.Heading>Sign Up Error!</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            ) : null}
            <Card className="w-25">
                <Form onSubmit={formik.handleSubmit}>
                    <Card.Body>
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            status="error"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(!formik.errors.email && formik.touched.email)
                            }
                            isInvalid={
                                !!(formik.errors.email && formik.touched.email)
                            }
                            errorMessage={formik.errors.email}
                        />

                        <Input
                            label="Login"
                            type="text"
                            name="login"
                            status="error"
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(!formik.errors.login && formik.touched.login)
                            }
                            isInvalid={
                                !!(formik.errors.login && formik.touched.login)
                            }
                            errorMessage={formik.errors.login}
                        />

                        <Input
                            label="Name"
                            type="text"
                            name="firstName"
                            status="error"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(
                                    !formik.errors.firstName
                                    && formik.touched.firstName
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.firstName
                                    && formik.touched.firstName
                                )
                            }
                            errorMessage={formik.errors.firstName}
                        />

                        <Input
                            label="Surname"
                            type="text"
                            name="secondName"
                            status="error"
                            value={formik.values.secondName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(
                                    !formik.errors.secondName
                                    && formik.touched.secondName
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.secondName
                                    && formik.touched.secondName
                                )
                            }
                            errorMessage={formik.errors.secondName}
                        />

                        <Input
                            label="Phone"
                            type="text"
                            name="phone"
                            status="error"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(!formik.errors.phone && formik.touched.phone)
                            }
                            isInvalid={
                                !!(formik.errors.phone && formik.touched.phone)
                            }
                            errorMessage={formik.errors.phone}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            status="error"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            errorMessage={formik.errors.password}
                        />

                        <Input
                            label="Password (repeat)"
                            type="password"
                            name="password_confirmation"
                            status="error"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={
                                !!(
                                    !formik.errors.password_confirmation
                                    && formik.touched.password_confirmation
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.password_confirmation
                                    && formik.touched.password_confirmation
                                )
                            }
                            errorMessage={formik.errors.password_confirmation}
                        />
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button
                            className="w-100"
                            variant="success"
                            type="submit"
                        >
                            Sign Up
                        </Button>
                        <Link to={ROUTES.SIGN_IN}>Do you have an account?</Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};
