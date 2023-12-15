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

  const handleClose = () => {
    setShow(false);
    setTitle('');
    setDescription('');
    setSelectedBook(null);
  };

  const handleShow = () => setShow(true);

  const handleUpdateBook = async () => {
    if (!selectedBook) {
      return;
    }

    const updatedBook = {
      ...selectedBook,
      title: title || selectedBook.title,
      description: description || selectedBook.description,
    };

    try {
      // Send a request to update the book on the server
      const response = await axios.put(`${import.meta.env.VITE_SERVER}/books/${selectedBook._id}`, updatedBook);
      const updatedBookData = response.data;

      // Call the parent component's update function
      onBookUpdate(updatedBookData);

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error updating book:', error);
    }
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
