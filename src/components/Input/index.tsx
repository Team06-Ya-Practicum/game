import React from 'react';
import { Form } from 'react-bootstrap';

interface IInputProps {
    label: string;
    type: string;
    name: string;
    onChange: any;
    onBlur?: any;
    value: any;
    status: 'normal' | 'error';
    isValid: boolean;
    isInvalid: boolean;
    errorMessage?: string | undefined;
}

export const Input = ({
    label,
    name,
    onChange,
    onBlur,
    value,
    isValid,
    isInvalid,
    type = 'text',
    status = 'normal',
    errorMessage = '',
}: IInputProps) => (
    <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            isInvalid={isInvalid}
            isValid={isValid}
        />
        {status === 'error' && isInvalid ? (
            <Form.Control.Feedback type="invalid">
                {errorMessage}
            </Form.Control.Feedback>
        ) : null}
    </Form.Group>
);
