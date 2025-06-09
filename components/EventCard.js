import React from 'react';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';

/**
 * Component to display an individual event or activity
 */
const EventCard = ({ item }) => {
  return (
    <div className={styles.eventCard}>
      {item.image && (
        <div className={styles.eventImageContainer}>
          <Image 
            src={item.image.src} 
            alt={item.image.alt} 
            className={styles.eventImage}
            width={300}
            height={200}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}
      
      <div className={styles.eventContent}>
        {item.title && <h4 className={styles.eventTitle}>{item.title}</h4>}
        {item.date && <div className={styles.eventDate}>{item.date}</div>}
        {item.description && (
          <div className={styles.eventDescription}>
            {item.description.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
        {item.link && (
          <a 
            href={item.link.url} 
            className={styles.eventLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.link.text || 'Read more'}
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
