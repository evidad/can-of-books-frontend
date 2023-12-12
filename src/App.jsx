import React, { useState } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BestBooks from './components/BestBooks.jsx';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';

let SERVER = import.meta.env.VITE_SERVER;

function App() {
  const [bestBooks, setBestBooks] = useState([]);

  async function fetchBestBooks() {
    try {
      let response = await axios.get(`${SERVER}/books`);
      setBestBooks(response.data);
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <> 
      {/* this router is a component that wraps all the stuff up that means everything inside it are children and the children can receive props */}
      <Router>
        <Header />
        <button onClick={fetchBestBooks}>Get Some Books</button>
        {/* routes and route are also components */}
        <Routes>
          {/* // path and elements are props
          // in this, it says the path is /books so render the BestBooks component */}  
          <Route exact path="/books" element={<BestBooks />} />
          <Route exact path="/about" element={<About />} />
          <Route exactpath="/" element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
