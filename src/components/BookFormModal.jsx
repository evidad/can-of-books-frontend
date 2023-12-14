import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BookFormModal({ onBookCreate }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setShow(false);
    // Clear the form inputs when the modal is closed
    setTitle('');
    setDescription('');
  };
  
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form inputs if needed
    if (!title || !description) {
      // Handle validation error
      return;
    }

    // Create a new book object
    const newBook = { title, description };

    // Pass the new book data to the parent component
    onBookCreate(newBook);

    // Close the modal
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Book
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="book-information">Book Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Book
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookFormModal;