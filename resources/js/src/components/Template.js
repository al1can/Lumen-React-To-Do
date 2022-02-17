import { React, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Container, Navbar } from 'react-bootstrap';


export const Template = ({ title, children }) => {

    return (
        <div>
            <Navbar expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href="#">Home</Navbar.Brand>
                </Container>
            </Navbar>

            {children}

        </div>
    )
}

export default Template;