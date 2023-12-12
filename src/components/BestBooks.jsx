function Book(props) {

  return (
    <ul>
     {
       props.dogs.map( (book, idx) => 
         <li key={book._id}>{book.name}</li>
       )
     }
   </ul>
  )
}

export default Book;