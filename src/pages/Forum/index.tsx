import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col, Spinner, Alert,
} from 'react-bootstrap';
import { ForumTopicPreview } from 'components/ForumTopicPreview';
import { Link } from 'react-router-dom';
import { Cars } from 'components/Cars';
import { ROUTES } from 'routes';
import axios from 'axios';
import { ITopicModel } from '../../../server/models/topic';

export const Forum = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([] as ITopicModel[]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const { data } = await axios.get('/myapi/forum/topics');
                setIsLoading(false);
                setTopics(data);
            } catch (error) {
                setIsError(true);
            }
        };
        loadData();
    }, []);
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
                <Row className="mb-2 text-center">
                    <Col>
                        <Link
                            to={`${ROUTES.FORUM}/create`}
                            className="btn btn-success"
                        >
                            Create new Topic
                        </Link>
                    </Col>
                </Row>
                {isLoading ? (
                    <Spinner className="text-white" animation="border" />
                ) : null}
                <Row>
                    {topics.map(topic => (
                        <Col key={topic.id} lg={4}>
                            <ForumTopicPreview
                                id={topic.id}
                                title={topic.title}
                                userId={topic.UserId as number}
                                createdAt={new Date(topic.createdAt)}
                            >
                                {topic.content}
                            </ForumTopicPreview>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};
