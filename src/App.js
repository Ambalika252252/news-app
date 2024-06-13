import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar';
import Home from './screens/Home';
import About from './screens/About';
import Contact from './screens/Contact';
import Services from './screens/Services';
import Gallery from './screens/Gallery';
import Footer from './Components/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />

            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        {/* <footer> */}
          {/* <Footer /> */}
        {/* </footer> */}
      </div>
    </Router>
  );
};

export default App;
