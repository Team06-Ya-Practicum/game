import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import * as Yup from 'yup';
import {
    Container, Row, Col, Card, Form, Alert,
} from 'react-bootstrap';
import { useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router';
import { Cars } from 'components/Cars';
import { ROUTES } from 'routes';
import axios from 'axios';
import * as Validators from '../../validators';

export const ForumTopicCreate = () => {
    const navigate = useNavigate();
    const UserId: number = useAppSelector(state => state.user.data.id);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: Yup.object({
            title: Validators.topicTitleValidator,
            content: Validators.requiredFiled,
        }),
        onSubmit: async ({
            title,
            content,
        }: {
            title: string;
            content: string;
        }) => {
            try {
                setIsLoading(true);
                const { data } = await axios.post(
                    '/myapi/forum/topics',
                    {
                        UserId,
                        title,
                        content,
                    },
                    {
                        withCredentials: true,
                    },
                );
                setIsLoading(false);
                navigate(`${ROUTES.FORUM}/${data.id}`);
            } catch (error) {
                setIsError(true);
            }
        },
    });

    return (
        <>
            <Cars />
            <Container className="p-2">
                <Row>
                    <Col xs={12}>
                        <Card>
                            {isError ? (
                                <Alert variant="danger">
                                    <Alert.Heading>Error!</Alert.Heading>
                                    <p>Unable to create new Topic!</p>
                                </Alert>
                            ) : null}
                            <Form onSubmit={formik.handleSubmit}>
                                <Card.Header className="text-center text-white">
                                    Create new Topic
                                </Card.Header>
                                <Card.Body>
                                    <Input
                                        label="Title"
                                        type="text"
                                        name="title"
                                        status="error"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={
                                            !!(
                                                !formik.errors.title
                                                && formik.touched.title
                                            )
                                        }
                                        isInvalid={
                                            !!(
                                                formik.errors.title
                                                && formik.touched.title
                                            )
                                        }
                                        errorMessage={formik.errors.title}
                                    />

                                    <Input
                                        label="Content"
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        name="content"
                                        status="error"
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={
                                            !!(
                                                !formik.errors.content
                                                && formik.touched.content
                                            )
                                        }
                                        isInvalid={
                                            !!(
                                                formik.errors.content
                                                && formik.touched.content
                                            )
                                        }
                                        errorMessage={formik.errors.content}
                                    />
                                </Card.Body>
                                <Card.Footer className="text-center">
                                    <Button
                                        variant="success"
                                        type="submit"
                                        isLoading={isLoading}
                                    >
                                        Create new Topic
                                    </Button>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
