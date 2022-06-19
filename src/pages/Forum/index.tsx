import React from 'react';
import {
    Button, Container, Row, Col,
} from 'react-bootstrap';
import { ForumTopicPreview } from 'components/ForumTopicPreview';
import { Cars } from 'components/Cars';

const data = [
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
    {
        title: 'My new topic',
        user: 'Alex',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velitiusto corporis doloribus quisquam. Ex nulla est, commodi quidemanimi quas fugit at saepe officia, facere quaerat ad, quisquamdolores doloremque!',
    },
];

export const Forum = () => (
    <>
        <Cars />
        <Container className="p-2">
            <Row className="mb-2 text-center">
                <Col>
                    <Button variant="success">Create new Topic</Button>
                </Col>
            </Row>
            <Row>
                {data.map((value, index) => (
                    <Col key={index} lg={4}>
                        <ForumTopicPreview
                            title={value.title}
                            user="Alex"
                            createdAt={new Date()}
                        >
                            {value.content}
                        </ForumTopicPreview>
                    </Col>
                ))}
            </Row>
        </Container>
    </>
);
