import React, { useState } from 'react';
import styles from '../styles/Home.module.scss';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Component to display a carousel that switches between Upcoming Events and Recent Activities sections
 */
const SectionCarousel = ({ upcomingEvents, recentActivities }) => {
  const [activeSection, setActiveSection] = useState('upcoming'); // 'upcoming' or 'recent'
  
  const sections = [
    { id: 'upcoming', title: 'UPCOMING EVENTS', data: upcomingEvents || [] },
    { id: 'recent', title: 'RECENT ACTIVITIES', data: recentActivities || [] }
  ];
  
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection);
  const currentSection = sections[currentSectionIndex];
  
  const goToNextSection = () => {
    const nextIndex = (currentSectionIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex].id);
  };
  
  const goToPrevSection = () => {
    const prevIndex = currentSectionIndex === 0 ? sections.length - 1 : currentSectionIndex - 1;
    setActiveSection(sections[prevIndex].id);
  };
  
  return (
    <div className={styles.sectionCarousel}>
      <div className={styles.carouselHeader}>
        <button 
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={goToPrevSection}
          aria-label="Previous section"
        >
          &#10094;
        </button>
        
        <h3 className={styles.sectionTitle}>{currentSection.title}</h3>
        
        <button 
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={goToNextSection}
          aria-label="Next section"
        >
          &#10095;
        </button>
      </div>
      
      <div className={styles.sectionContent}>
        {currentSection.data.length > 0 ? (
          <div className={styles.eventList}>
            {currentSection.data.map((item, index) => (
              <div key={index} className={`${styles.eventItem} ${item.type === 'activity' ? styles.activityItem : ''}`}>
                {/* Activity Type Badge (for Recent Activities only) */}
                {item.type === 'activity' && item.activityType && (
                  <div className={styles.activityTypeBadge}>
                    {item.activityType}
                  </div>
                )}
                
                {item.image && (
                  <div className={styles.eventImageContainer}>
                    <Image 
                      src={item.image.src} 
                      alt={item.image.alt || item.title} 
                      width={item.image.width || 500} 
                      height={item.image.height || 300}
                      className={item.type === 'activity' ? styles.activityImage : styles.eventImage}
                      style={{ 
                        objectFit: 'contain',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto'
                      }}
                      unoptimized={true}
                    />
                  </div>
                )}
                
                <h4 className={styles.eventTitle}>
                  {/* Strip any HTML tags from title */}
                  {item.title && item.title.replace(/<[^>]*>/g, '')}
                </h4>
                
                {/* Date (for events only) */}
                {item.type !== 'activity' && item.date && (
                  <div className={styles.eventDate}>{item.date}</div>
                )}
                
                {/* Description */}
                <div className={styles.eventDescription}>
                  {item.description && (
                    <div>
                      {item.type === 'event' ? (
                        // For events, show the speaking engagement details
                        <p>
                          {item.description.replace(item.title || '', '').replace(item.date || '', '').trim()}
                        </p>
                      ) : (
                        // For activities, show the description as before
                        <p>
                          {typeof item.description === 'string' ? 
                            item.description.replace(/<[^>]*>/g, '') : 
                            item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Link */}
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
            ))}
          </div>
        ) : (
          <div className={styles.emptyMessage}>
            No {activeSection === 'upcoming' ? 'upcoming events' : 'recent activities'} to display.
          </div>
        )}
      </div>
      
      <div className={styles.carouselIndicators}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.indicator} ${activeSection === section.id ? styles.activeIndicator : ''}`}
            onClick={() => setActiveSection(section.id)}
            aria-label={`Go to ${section.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCarousel;
