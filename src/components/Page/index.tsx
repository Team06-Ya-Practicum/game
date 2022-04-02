import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export const Page = (props: any) => {
    const { children } = props;
    return (
        <div className="d-flex flex-column h-100">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">CRYSTAL CATCHER</Navbar.Brand>
                </Container>
            </Navbar>

            {children}
        </div>
    );
};
