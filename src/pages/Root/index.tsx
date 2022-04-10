import React from 'react';
import cn from 'classnames';
import {
    Container, Card, Row, Col, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import characterImage from '../../img/character_front.svg';
import backgroundImage from '../../img/road_ready.svg';
import css from './Root.module.css';
import { ROUTES } from '../../index';

export const Root = () => (
    <Container
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className={`d-flex h-100 justify-content-end ${cn(css.root)}`}
        fluid
    >
        <Card className={`w-50 mt-auto mb-auto ${cn(css.introduction)}`}>
            <Card.Body>
                <Row className="mb-3">
                    <Col>
                        <p>YOUR RETRO ADVENTURE STARTS HERE</p>
                        <p>
                            Jump in and catch as many crystals as you can, but
                            be aware of the traffic. Take your path to the
                            leaderboards and become THE LEGEND
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="d-flex flex-column justify-content-center"
                        md={4}
                    >
                        <Link
                            className="w-100 mb-3 btn btn-success"
                            to={ROUTES.SIGN_UP}
                        >
                            REGISTER
                        </Link>
                        <Link className="w-100 btn btn-danger" to={ROUTES.GAME}>
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
);
