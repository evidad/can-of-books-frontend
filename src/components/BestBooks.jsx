import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import UpdateBook from './UpdateBook';

function BestBooks() {
  const [books, setBooks] = useState([]);

  const handleBookCreate = async (newBook) => {
    console.log(newBook);
    try {
      // first parameter is the URL, second parameter is the data
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

  // 1. this fetches the books from the server to display on the web browser
  const fetchBooks = async () => {
    try {
      console.log(import.meta.env.VITE_SERVER)
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/books`);
      console.log(response);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookUpdate = async (updatedBook) => {
    try {
      // Send a request to update the book on the server
      let response = await axios.put(`${import.meta.env.VITE_SERVER}/books/${updatedBook.id}`, updatedBook);
      // Update the local state with the updated book
      setBooks(books.map((book) => (book.id === updatedBook.id ? response.data : book)));
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
                  <span
                    id={book.title}
                    onClick={handleDelete}
                    style={{ marginLeft: '.5em', color: 'red', cursor: 'pointer' }}
                  >
                    Delete Book
                  </span>
                  {/* Fix the props passed to UpdateBook */}
                  <UpdateBook book={book} onBookUpdate={handleBookUpdate} />
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
