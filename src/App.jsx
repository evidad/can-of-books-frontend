import React, { useState } from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BestBooks from './components/BestBooks.jsx';
// import About from './components/About';
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
      <Router>
        <Header />
        <button onClick={fetchBestBooks}>Get Some Books</button>
        <Routes>
          <Route
            exact path="/books"
            element={<BestBooks bestBooks={bestBooks} />}
          >
          </Route>
          {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
