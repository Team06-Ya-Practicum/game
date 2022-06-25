import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input } from 'components/Input';
import * as Yup from 'yup';
import { Button } from 'components/Button';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Spinner,
    Alert,
} from 'react-bootstrap';
import { useAppSelector } from 'store/hooks';
import { Cars } from 'components/Cars';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ITopicModel } from '../../../server/models/topic';
import { ICommentModel } from '../../../server/models/comment';
import * as Validators from '../../validators';

interface ITopicAnswer extends ITopicModel {
    Comments: ICommentModel[];
}

export const ForumTopic = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingPostComment, setIsLoadingPostComment] = useState(false);
    const { topicId: TopicId } = useParams();
    const UserId = useAppSelector(state => state.user.data.id);
    const [topic, setTopic] = useState({} as ITopicAnswer);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await axios.get(
                    `/myapi/forum/topics/${TopicId}`,
                    { withCredentials: true },
                );
                setTopic(data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
            }
        };
        loadData();
    }, []);
    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: Yup.object({
            content: Validators.requiredFiled,
        }),
        onSubmit: async ({ content }) => {
            try {
                setIsLoadingPostComment(true);
                const { data } = await axios.post(
                    '/myapi/forum/comments',
                    {
                        TopicId,
                        content,
                        UserId,
                        parent: null,
                    },
                    { withCredentials: true },
                );
                setIsLoadingPostComment(false);
                setTopic({
                    ...topic,
                    Comments: [...topic.Comments, data],
                } as ITopicAnswer);
            } catch (error) {
                setIsError(true);
            }
        },
    });
    return (
        <>
            <Cars />
            <Container className="p-2">
                {isError ? (
                    <Alert variant="danger">
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>Something went wrong!</p>
                    </Alert>
                ) : null}
                <Row>
                    <Col xs={12}>
                        <Card>
                            <Card.Header className="text-center text-white">
                                {isLoading ? (
                                    <Spinner animation="border" />
                                ) : (
                                    topic.title
                                )}
                            </Card.Header>
                            <Card.Body>
                                {isLoading ? (
                                    <Spinner
                                        className="text-white"
                                        animation="border"
                                    />
                                ) : (
                                    <>
                                        <Card.Text className="text-white">
                                            {topic.content}
                                        </Card.Text>
                                        <Card.Text className="text-muted">{`by ${
                                            topic.UserId
                                        } at ${new Date(
                                            topic.createdAt,
                                        ).toDateString()}`}</Card.Text>
                                    </>
                                )}
                            </Card.Body>
                            <Card.Footer>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Input
                                        label="Leave a comment"
                                        type="text"
                                        as="textarea"
                                        rows={3}
                                        name="content"
                                        status="error"
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
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
                                    <Form.Group className="text-center">
                                        <Button
                                            variant="success"
                                            type="submit"
                                            isLoading={isLoadingPostComment}
                                        >
                                            Post a comment
                                        </Button>
                                    </Form.Group>
                                </Form>
                                <Card.Text className="text-white">
                                    Comments:
                                </Card.Text>
                                {isLoading ? (
                                    <Spinner
                                        className="text-white"
                                        animation="border"
                                    />
                                ) : (
                                    topic.Comments.map(
                                        (comment: ICommentModel) => (
                                            <Card.Text
                                                key={comment.id}
                                                className="text-white"
                                            >
                                                {`[${new Date(
                                                    comment.createdAt,
                                                ).toDateString()}] ${
                                                    comment.UserId
                                                }: ${comment.content}`}
                                            </Card.Text>
                                        ),
                                    )
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
