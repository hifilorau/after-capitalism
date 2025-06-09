import React, { useState } from 'react';
import EventCard from './EventCard';
import styles from '../styles/Home.module.scss';

/**
 * Component to display a carousel of events or activities
 */
const EventCarousel = ({ items, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className={styles.carouselContainer}>
      <h3 className={styles.carouselTitle}>{title}</h3>
      
      <div className={styles.carouselContent}>
        <button 
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous item"
        >
          &#10094;
        </button>
        
        <div className={styles.carouselSlide}>
          <EventCard item={items[currentIndex]} />
        </div>
        
        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next item"
        >
          &#10095;
        </button>
      </div>
      
      <div className={styles.carouselIndicators}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
