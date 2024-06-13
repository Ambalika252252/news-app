import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles.css';
import About from './About';
import Services from './Services';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [news, setNews] = useState([]);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch('http://localhost:9000/slider/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSliderData(data);
      } catch (error) {
        console.error('Error fetching slider data:', error);
      }
    };

    fetchSliderData();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:9000/news');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleNext = () => {
    if (currentIndex < sliderData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(sliderData.length - 1);
    }
  };

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAbout = () => {
    scrollToSection(aboutRef);
    navigate('/about');
  };

  const handleServices = () => {
    scrollToSection(servicesRef);
    navigate('/services');
  };

  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveTab('about');
    } else if (location.pathname === '/services') {
      setActiveTab('services');
    } else {
      setActiveTab('home');
    }
  }, [location]);

  return (
    <div className='main-container'>
      <h4>Welcome to IndiaTv.com</h4>
      <div className='carousel-container'>
        <div className='carousel-arrows'>
          <button className='carousel-button left' onClick={handlePrev}>‹</button>
          <button className='carousel-button right' onClick={handleNext}>›</button>
        </div>
        <div
          className='carousel'
          style={{ transform: `translateX(-${(100 / sliderData.length) * currentIndex}%)` }}
        >
          {sliderData.map((item, index) => (
            <div key={index} className='carousel-item'>
              <img src={item.img} alt={`Slide ${index}`} className='slider' />
              <p className='slider-title'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='news-container'>
        <div className='subHeading'>News</div>

        {news.length > 0 ? (
          news.map((item, index) => (
            <div className='news-item'>
              <div className='news-image'>
                <img src={item.img} />
              </div>
              <div className='newsInfo'>
                <p className='news-title'>{item.title}</p>
                <p className='news-detail'>{item.detail}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>

      <div ref={aboutRef}>
        <About />
        <button onClick={handleAbout}>Learn More</button>
      </div>

      <div ref={servicesRef}>
        <Services />
        <button onClick={handleServices}>Learn More</button>
      </div>
    </div>
  );
};

export default Home;
