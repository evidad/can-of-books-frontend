import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {If, Then, Else} from 'react-if';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import UpdateBook from './UpdateBook';


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
        return book._id !== e.target.id;
      });
      setBooks(newBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/books`);
      console.log(response.data);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();

    return () => {
    };
  }, []);

  return (
    <>
      <p>My Essential Lifelong Learning &amp; Formation Shelf</p>
      <BookFormModal onBookCreate={handleBookCreate} />

      <If condition={books.length}>
        <Then>
          <Carousel style={{ padding: '5em', background: '#111' }}>
            {books.map((book) => (
              <Carousel.Item key={book._id}>
                <img src={`https://placehold.co/800x400?text=${book.title}`} height="400" width="100%" />
                <Carousel.Caption>
                  <p>{book.description}</p>
                  <span
                    id={book._id}
                    onClick={handleDelete}
                    style={{ marginLeft: '.5em', color: 'red', cursor: 'pointer' }}
                  >
                    Delete Book
                  </span>
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
