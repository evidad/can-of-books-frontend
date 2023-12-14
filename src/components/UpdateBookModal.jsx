import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function UpdateBookModal({ onBookUpdate, books }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  const selectBook = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setDescription(book.description);
  };

  const handleUpdateBook = async () => {
    try {
      const updatedBook = { ...selectedBook, title, description };
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/books/${selectedBook.title}`, updatedBook);
      const newBooksList = books.map((book) => (book.title === selectedBook.title ? response.data : book));
      onBookUpdate(newBooksList);
      handleClose();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setTitle('');
    setDescription('');
    setSelectedBook(null);
  };

  const handleShow = () => setShow(true);

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
                placeholder={`Enter title (${selectedBook ? selectedBook.title : ''})`}
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
                placeholder={`Enter description (${selectedBook ? selectedBook.description : ''})`}
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
