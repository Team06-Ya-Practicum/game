import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { changeUserAvatar } from 'controllers/user';
import {
    Image, Modal, Form, Button,
} from 'react-bootstrap';

interface IAvatarProps {
    src: string;
}

export const Avatar = ({ src }: IAvatarProps) => {
    const dispatch = useAppDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [file, setFile] = useState(null);

    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        if (file !== null) {
            const formData = new FormData();
            formData.append('avatar', file);
            dispatch(changeUserAvatar(formData));
        }
    };

    return (
        <>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="sm"
                centered
            >
                <Modal.Header>
                    <Modal.Title>Change Avatar</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Pick your new avatar</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            type="button"
                            onClick={onFileUpload}
                        >
                            Change Avatar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Image
                style={{
                    cursor: 'pointer',
                    background: '#c4c4c4',
                    width: '100px',
                    height: '100px',
                }}
                fluid={true}
                onClick={() => setModalShow(true)}
                src={
                    src
                        ? `https://ya-praktikum.tech/api/v2/resources${src}`
                        : undefined
                }
                roundedCircle={true}
            />
        </>
    );
};
