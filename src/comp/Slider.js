import React from 'react';
import API_URL from './config';
import PropTypes from 'prop-types';
import './Slider.css';

const Slider = ({ slides }) => {
  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div key={index} className="slide">
          <img src={slide.image_url} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

Slider.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Slider;
