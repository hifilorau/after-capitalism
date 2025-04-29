import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

const NewsModal = ({ setIsOpen, newsContent }) => {
  // Add effect to prevent body scrolling when modal is open
  useEffect(() => {
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when modal closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.outerModal}>
      <div className={styles.innerModal}>
        <div className={styles.modalHeader}>
          <div className={styles.headerFlex}>
            <h3>Recent Activity and Upcoming Events</h3>
            <Link href="/news-and-media">
              <a className={styles.viewAllLink}>View All</a>
            </Link>
          </div>
          <div onClick={() => setIsOpen(false)} className={styles.close}>X</div>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.newsItem}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(newsContent, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allowfullscreen', 'scrolling'] })
              }}
            />
          </div>
          {/* View All link moved to header */}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
