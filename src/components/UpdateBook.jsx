import React, { useState, useEffect } from 'react';

function UpdateBook(props) {
  const [updatedBook, setUpdatedBook] = useState({});

  const handleChange = (e) => {
    setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updatedBook data to the parent component for handling the update
    props.onBookUpdate(updatedBook);
  };

  useEffect(() => {
  // Reset the updatedBook state whenever the book prop changes
  if (props.updatedBook) {
    setUpdatedBook(props.updatedBook);
  }
}, [props.updatedBook]);

  return (
    <form onSubmit={handleSubmit}>
      <input id="text" name="title" value={updatedBook.title} onChange={handleChange} />
      <textarea name="description" value={updatedBook.description} onChange={handleChange} />
      <button type="submit">Update Book</button>
    </form>
  );
}

export default UpdateBook;
