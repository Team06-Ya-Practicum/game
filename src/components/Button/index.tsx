import React from 'react';
import { Button as BootstrapButton, Spinner } from 'react-bootstrap';

interface IButtonProps {
    isLoading: boolean;
    children: JSX.Element | string;
    [otherProps: string]: any;
}

export const Button = ({
    isLoading,
    children,
    ...otherProps
}: IButtonProps) => (
    <BootstrapButton {...otherProps}>
        {isLoading ? <Spinner animation="border" size="sm" /> : children}
    </BootstrapButton>
);
