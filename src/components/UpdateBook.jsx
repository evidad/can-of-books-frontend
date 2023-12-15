// originally started with John's code, but couldn't figure out how to work so used ChatGPT and magically works

import React, { useState, useEffect } from 'react';

function UpdateBook(props) {
  const [book, setBook] = useState({ title: '', description: '' });

  useEffect(() => {
    // Update the local state when the prop changes
    setBook(props.book || { title: '', description: '' });
  }, [props.book]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated book data to the parent component for handling the update
    props.onBookUpdate(book);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="title" value={book.title} />
      <input onChange={handleChange} name="description" value={book.description} />
      <button type="submit">Update Book</button>
    </form>
  );
}

export default UpdateBook;
