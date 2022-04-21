import React from 'react';
import {
    Form, Button, Container, Card, Alert, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { changeUserPassword } from 'controllers/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as Validators from '../../validators';
import { ROUTES } from '../../index';
import { Cars } from '../../components/Cars';
import { Input } from '../../components/Input';

export const ChangePassword = () => {
    const error = useAppSelector(state => state.user.error);
    const isLoading = useAppSelector(state => state.user.isLoading);
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        },
        validationSchema: Yup.object({
            oldPassword: Validators.passwordValidator,
            newPassword: Validators.passwordValidator,
            newPasswordConfirmation:
                Validators.passwordConfirmationValidator('newPassword'),
        }),
        onSubmit: async ({ oldPassword, newPassword }) => {
            dispatch(changeUserPassword({ oldPassword, newPassword }));
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
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                            status="error"
                            value={formik.values.oldPassword}
                            onChange={formik.handleChange}
                            isValid={
                                !!(
                                    !formik.errors.oldPassword
                                    && formik.touched.oldPassword
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.oldPassword
                                    && formik.touched.oldPassword
                                )
                            }
                        />

                        <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            status="error"
                            value={formik.values.newPassword}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={
                                !!(
                                    !formik.errors.newPassword
                                    && formik.touched.newPassword
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.newPassword
                                    && formik.touched.newPassword
                                )
                            }
                            errorMessage={formik.errors.newPassword}
                        />

                        <Input
                            label="New Password (Repeat)"
                            name="newPasswordConfirmation"
                            type="password"
                            status="error"
                            value={formik.values.newPasswordConfirmation}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            isValid={
                                !!(
                                    !formik.errors.newPasswordConfirmation
                                    && formik.touched.newPasswordConfirmation
                                )
                            }
                            isInvalid={
                                !!(
                                    formik.errors.newPasswordConfirmation
                                    && formik.touched.newPasswordConfirmation
                                )
                            }
                            errorMessage={formik.errors.newPasswordConfirmation}
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
                        <Link to={ROUTES.PROFILE}>Back to profile</Link>
                    </Card.Footer>
                </Form>
            </Card>
        </Container>
    );
};
