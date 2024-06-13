import React, { useState, useEffect } from 'react';

const Services = () => {
  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch('http://localhost:9000/service');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchService();
  }, []);


  return (
    <div className='services-container'>
      <h2 className='subHeading'>Services we provide</h2>
      {service.map((service, index) => (
        <div key={index}>
          <h3>{service.title}</h3>
          <p>{service.detail}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
