import React from 'react';
import { Page } from 'components/Page';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import backkgroundImage from '../../img/road_ready.svg';
import characterImage from '../../img/character_front.svg';

export const Root = () => (
    <Page>
        <Container
            className="d-flex h-100 justify-content-end"
            style={{
                backgroundImage: `url(${backkgroundImage})`,
                backgroundSize: 'cover',
            }}
            fluid
        >
            <Card
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    border: '0',
                    borderRadius: '15px',
                }}
                className="w-50 mt-auto mb-auto"
            >
                <Card.Body>
                    <Row className="mb-3">
                        <Col>
                            YOUR RETRO ADVENTURE STARTS HERE <br />
                            Jump in and catch as many crystals as you can, but
                            be aware of the traffic. Take your path to the
                            leaderboards and become THE LEGEND
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            className="d-flex flex-column justify-content-center"
                            md={4}
                        >
                            <Link
                                className="w-100 mb-3 btn btn-success"
                                to="/signup"
                            >
                                REGISTER
                            </Link>
                            <Link className="w-100 btn btn-danger" to="/game">
                                PLAY
                            </Link>
                        </Col>
                        <Col className="d-flex justify-content-center" md={8}>
                            <Image src={characterImage} />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </Page>
);
