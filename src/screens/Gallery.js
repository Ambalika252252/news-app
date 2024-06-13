import React, { useState, useEffect } from 'react';
import './Styles.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the API
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:9000/gallery');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data); 
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []); 

  return (
    <div className='gallery-container'>
      <h2 className='subHeading'>Gallery</h2>
      <div className='gallery-grid'>
        {images.map((image, index) => (
          <div key={index} className='gallery-item'>
            <img src={image.img} alt={`Gallery Item ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
