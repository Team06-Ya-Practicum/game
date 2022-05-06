import React from 'react';
import {
    Form, Button, Card, Alert, Spinner,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { changeUserPassword } from 'controllers/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { PageCentered } from 'components/PageCentered';
import { EUserTypeError } from 'store/slices/userSlice';
import * as Validators from '../../validators';
import { ROUTES } from '../../routes';
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
        <PageCentered withCars>
            {error && error.type === EUserTypeError.CHANGE_USER_PASSWORD ? (
                <Alert variant="danger" className="w-25">
                    <Alert.Heading>Change Password Error!</Alert.Heading>
                    <p>{error.message}</p>
                </Alert>
            ) : null}
            <Card>
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
        </PageCentered>
    );
};
