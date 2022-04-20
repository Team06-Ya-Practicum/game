import React, { ChangeEvent, useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { changeUserAvatar } from 'controllers/user';
import {
    Image, Modal, Form, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import css from './Avatar.module.css';

interface IAvatarProps {
    src: string;
    size: string;
}

export const Avatar = ({ src, size }: IAvatarProps) => {
    const dispatch = useAppDispatch();
    const [modalShow, setModalShow] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const newFile = target.files[0];
            if (newFile) {
                setFile(newFile);
            }
        }
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
                    width: size,
                    height: size,
                }}
                className={cn(css.avatar)}
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
