import React from 'react';
import cn from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import { Cars } from 'components/Cars';
import css from './PageCentered.module.css';

interface IPageCentered {
    children: React.ReactNode;
    withCars: boolean;
}

export const PageCentered = ({ children, withCars }: IPageCentered) => (
    <Container className="d-flex flex-column flex-fill justify-content-center align-items-center py-3">
        {withCars ? <Cars /> : null}
        <Row>
            <Col className={`mx-auto ${cn(css.col)}`}>{children}</Col>
        </Row>
    </Container>
);
