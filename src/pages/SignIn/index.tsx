import React from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { Button } from 'components/Button';
import { PageCentered } from 'components/PageCentered';
import { EUserTypeError } from 'store/slices/userSlice';
import * as Validators from '../../validators';
import { Input } from '../../components/Input';
import { fetchOAuth, signIn } from '../../controllers/authorization';
import { ROUTES } from '../../routes';

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector(state => state.user);
    const submitWithYandex = () => {
        dispatch(fetchOAuth());
    };
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: Yup.object({
            login: Validators.loginValidator,
            password: Validators.passwordValidator,
        }),
        onSubmit: ({ login, password }) => {
            dispatch(signIn({ login, password }));
        },
    });
    return (
        <PageCentered withCars>
            {error && error.type === EUserTypeError.SIGN_IN ? (
                <Alert variant="danger">
                    <Alert.Heading>Sign In Error!</Alert.Heading>
                    <p>{error.message}</p>
                </Alert>
            ) : null}
            <Card>
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
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>
                        <Button
                            className="w-100 mb-1"
                            variant="success"
                            onClick={submitWithYandex}
                            isLoading={isLoading}
                        >
                            Sign In with Yandex ID
                        </Button>
                        <Link to={ROUTES.SIGN_UP}>
                            Don&apos;t have an account?
                        </Link>
                    </Card.Footer>
                </Form>
            </Card>
        </PageCentered>
    );
};
