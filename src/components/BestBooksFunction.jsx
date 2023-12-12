import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const SERVER = 'http://localhost:3000';

function BestBooks() {
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'title') { setTitle(value); }
        if (name === 'description') { setDescription(value); }
    }

    const handleDelete = async (e) => {
        // delete the book
        console.log('delete', e.target.id);
        let response = await axios.delete(`${SERVER}/books/${event.target.id}`);
        // thi will return empty object
        let book = response.data;
        // filter returns true or fale
        let newBooks = books.filter((book) => {
            return book._id !== e.target.id;
        });
        setBooks(newBooks);
    }

    //   send the new book data to the server
    const handleSubmit = async (e) => {
        e.preventDefault();
        // 1. Create an object that looks like a book to send to the server
        let book = { title, description };
        console.log('Sending book to server', book);
        // 2. Use axios to make a POST request to the server with object as body
        let response = await axios.post(`${SERVER}/books`, book);
        console.log('server response', response.data);
        // 3. Add the new book from the server to our state (books)
        setBooks([...books, response.data])
    }

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${SERVER}/books`);
            console.log(response.data);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        console.log('Mounted Up!');
        fetchBooks();

        return () => {
            console.log('Unmounted');
        };
    }, [count]);

    //   Somewhere here how do we rerender the page to show the update
    return (
        <>
            <p>My Essential Lifelong Learning &amp; Formation Shelf</p>
            <hr>
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
                <p>{count}</p>
            </hr>
            <form onSubmit={handleSubmit}>
                <input name="title" placeholder='title' onChange={handleChange} />
                <input name="description" placeholder='description' onChange={handleChange} />
            </form>
            {books.length ? (
                <Carousel style={{ padding: "5em", background: "#111" }}>

                    {
                        books.map((book) => (
                            <Carousel.Item key={book._id}>
                                <img src={`https://placehold.co/800x400?text=${book.title}`} height="400" width="100%" />
                                <Carousel.Caption>
                                    <p>{book.description}</p>
                                    <span id={book._id} onClick={handleDelete} style={{ marginLeft: ".5em", color: "red", cursor: "pointer" }}>X</span>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}

                </Carousel>
            ) : (
                <p>No Books Found :(</p>
            )}
            {/* TODO: Add code to render the book carousel */}
            <p>Book Carousel coming soon</p>
        </>
    );
}

export default BestBooks;
