import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BestBooks from './components/BestBooks.jsx';
import About from './components/About';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <>
      <Router>
        <Header />
        <Routes>
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
