import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import UpdateBookModal from './UpdateBookModal';
import { Button } from 'react-bootstrap'

function BestBooks() {
  const [books, setBooks] = useState([]);

  const handleBookCreate = async (newBook) => {
    try {
      let response = await axios.post(`${import.meta.env.VITE_SERVER}/books`, newBook);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleDelete = async (e) => {
    try {
      let response = await axios.delete(`${import.meta.env.VITE_SERVER}/books/${e.target.id}`);
      let book = response.data;
      let newBooks = books.filter((book) => {
        return book.title !== e.target.id;
      });
      setBooks(newBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      console.log(import.meta.env.VITE_SERVER);
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/books`);
      console.log('Here are the server books', response);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookUpdate = async (book) => {
    try {
      console.log('Sending updated book to server', book);
      let response = await axios.put(`${import.meta.env.VITE_SERVER}/books/${book._id}`, book);
      let updatedBook = response.data;
      console.log('From the server, the updated book is', updatedBook);
      let newBooksList = books.map((existingBook) =>
        existingBook._id === updatedBook._id ? updatedBook : existingBook
      );
      setBooks(newBooksList);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <p>My Essential Lifelong Learning &amp; Formation Shelf</p>
      <BookFormModal onBookCreate={handleBookCreate} />

      <If condition={books.length}>
        <Then>
          <Carousel style={{ padding: '5em', background: '#111' }}>
            {books.map((book) => (
              <Carousel.Item key={book.title}>
                <img src={`https://placehold.co/800x400?text=${book.title}`} height="400" width="100%" />
                <Carousel.Caption>
                  <p>{book.description}</p>
                  <UpdateBookModal book={book} onBookUpdate={handleBookUpdate} />
                  <Button
                    variant="danger"
                    id={book.title}
                    onClick={handleDelete}
                    style={{ marginLeft: '.5em', cursor: 'pointer' }}
                  >
                    Delete Book
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Then>
        <Else>
          <p>No Books Found</p>
        </Else>
      </If>
    </>
  );
}

export default BestBooks;
