import React, {useState, useEffect} from 'react';

function UpdateForm(props) {

    const [book, setBook] = useState({});

    function handleChange(e) {
        // dog is { breed: "", name: "" }
        setBook( { ...book,  [e.target.name]: e.target.value } );
    }

    function handleSubmit(e) { 
        e.preventDefault();
        props.handleSubmit(book);
        e.target.reset();
        setBook({title:'', description:''});
    }

    // useEffect runs when "something" changes. It watches for things
    useEffect( () => {
      console.log("I'm running because props.book changed");
      setBook(props.book || {});
    }, [props.book])

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name='title' value={book.title} />
            <input onChange={handleChange} name='description' value={book.description} />
            <button type='submit'>Update Book</button>
        </form>
    )

}

export default UpdateForm;