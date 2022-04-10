import React from 'react';
import { Form } from 'react-bootstrap';

interface IInputProps {
    label: string;
    type: string;
    name: string;
    formik: Record<string, any>;
    isBlur: boolean;
    isError: boolean;
}

export const Input = ({
    label,
    name,
    formik,
    isBlur = false,
    isError = false,
    type = 'text',
}: IInputProps) => (
    <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            name={name}
            onChange={formik.handleChange}
            onBlur={isBlur ? formik.handleBlur : undefined}
            value={formik.values[name]}
            isInvalid={!!(formik.errors[name] && formik.touched[name])}
            isValid={!!(!formik.errors[name] && formik.touched[name])}
        />
        {isError && formik.errors[name] && formik.touched[name] ? (
            <Form.Control.Feedback type="invalid">
                {formik.errors[name]}
            </Form.Control.Feedback>
        ) : null}
    </Form.Group>
);
