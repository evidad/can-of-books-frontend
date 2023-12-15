// used ChatGPT to integrate modal into update feature

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UpdateBookModal({ book, onBookUpdate }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const selectBook = (book) => {
    setTitle(book.title);
    setDescription(book.description);
  };

  const handleClose = () => {
    setShow(false);
    setTitle('');
    setDescription('');
  };

  const handleShow = () => {
    selectBook(book);
    setShow(true);
  };

  const handleUpdateBook = () => {
    const updatedBook = {
      _id: book._id,
      title,
      description,
    };

    onBookUpdate(updatedBook);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="book-information">Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter title (${book.title})`}
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={`Enter description (${book.description})`}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateBook}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBookModal;
