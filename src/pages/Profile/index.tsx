import React from 'react';
import {
    Form, Button, Container, Card, Alert, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { changeUserProfile } from 'controllers/user';
import { signOut } from 'controllers/authorization';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Avatar } from 'components/Avatar';
import * as Validators from '../../validators';
import { ROUTES } from '../../index';
import { Cars } from '../../components/Cars';
import { Input } from '../../components/Input';

export const Profile = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.user.isLoading);
    const error = useAppSelector(state => state.user.error);
    const {
        email: currentEmail,
        login: currentLogin,
        firstName: currentFirstName,
        secondName: currentSecondName,
        phone: currentPhone,
        avatar,
    } = useAppSelector(state => state.user.data);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: currentEmail,
            login: currentLogin,
            firstName: currentFirstName,
            secondName: currentSecondName,
            phone: currentPhone,
        },
        validationSchema: Yup.object({
            email: Validators.emailValidator,
            login: Validators.loginValidator,
            firstName: Validators.nameValidator,
            secondName: Validators.nameValidator,
            phone: Validators.phoneValidator,
        }),
        onSubmit: async ({
            email, login, firstName, secondName, phone,
        }) => {
            dispatch(
                changeUserProfile({
                    firstName,
                    secondName,
                    login,
                    email,
                    phone,
                }),
            );
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
                        <div className="w-100 text-center">
                            <Avatar src={avatar} />
                        </div>

                        <Input
                            label="Email"
                            name="email"
                            type="email"
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
                            name="login"
                            type="text"
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
                            name="firstName"
                            type="text"
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
                            name="secondName"
                            type="text"
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
                            name="phone"
                            type="text"
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
                    </Card.Body>
                    <Card.Footer className="text-center">
                        <Button
                            className="w-100 mb-2"
                            variant="success"
                            type="submit"
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                        <Link
                            className="btn btn-warning w-100 mb-2"
                            to={ROUTES.CHANGE_PASSWORD}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Change Password'
                            )}
                        </Link>
                        <Button
                            className="w-100 mb-1"
                            variant="danger"
                            type="button"
                            onClick={async () => {
                                dispatch(signOut());
                            }}
                        >
                            {isLoading ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Sign Out'
                            )}
                        </Button>
                        <Link to={ROUTES.GAME}>Back to game</Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};
