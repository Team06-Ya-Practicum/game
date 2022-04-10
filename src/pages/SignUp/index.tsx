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
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Login"
                            type="text"
                            name="login"
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Name"
                            type="text"
                            name="firstName"
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Surname"
                            type="text"
                            name="secondName"
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Phone"
                            type="text"
                            name="phone"
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            formik={formik}
                            isBlur={true}
                            isError={true}
                        />

                        <Input
                            label="Password (repeat)"
                            type="password"
                            name="password_confirmation"
                            formik={formik}
                            isBlur={true}
                            isError={true}
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
                        <Link to="/signin">Do you have an account?</Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};
