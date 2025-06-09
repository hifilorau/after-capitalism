import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import SectionCarousel from './SectionCarousel';

const NewsModal = ({ setIsOpen, newsContent, newsData }) => {
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
      <Head>
        <style>{`
          /* Override WordPress inline styles */
          .ra-ue-container p {
            border: none !important;
            border-width: 0 !important;
            border-style: none !important;
            margin-bottom: 1em !important;
            color: #d0d0d0 !important;
          }
          .upcoming-events p, .recent-activities p {
            border: none !important;
            border-width: 0 !important;
            border-style: none !important;
            color: #d0d0d0 !important;
          }
          [data-section="upcoming-events"] p, [data-section="recent-activities"] p {
            border: none !important;
            border-width: 0 !important;
            border-style: none !important;
            color: #d0d0d0 !important;
          }
          /* Target WordPress specific styles */
          .wp-block-paragraph {
            border: none !important;
            border-width: 0 !important;
          }
          /* Additional sleek styling */
          .ra-ue-container h3 {
            color: #f5f5f5 !important;
            font-size: 1.4rem !important;
            margin-top: 1em !important;
            margin-bottom: 0.5em !important;
            border-bottom: 1px solid #333 !important;
            padding-bottom: 0.5em !important;
          }
          .upcoming-events, .recent-activities {
            padding: 0.5em !important;
          }
          /* Style links in the modal */
          .ra-ue-container a {
            color: #e22226 !important;
            text-decoration: none !important;
            transition: color 0.2s ease !important;
          }
          .ra-ue-container a:hover {
            color: #ff6b6e !important;
          }
        `}</style>
      </Head>
      <div className={styles.innerModal}>
        <div className={styles.modalHeader}>
          <div className={styles.mobileHeader}>
            <div className={styles.headerFlex}>
              <h3>Recent Activity and Upcoming Events</h3>
              <Link href="/news-and-media">
                <a className={styles.viewAllLink}>View All</a>
              </Link>
            </div>
            <div onClick={() => setIsOpen(false)} className={styles.close}>X</div>
          </div>
        </div>
        <div className={`${styles.modalContent} ${styles.newsModal}`}>
          {/* If we have structured data, use React components */}
          {newsData ? (
            <div className={styles.newsReactContent}>
              <SectionCarousel 
                upcomingEvents={newsData.upcomingEvents} 
                recentActivities={newsData.recentActivities} 
              />
            </div>
          ) : (
            /* Fallback to HTML content if structured data is not available */
            <div className={styles.newsItem}>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(newsContent, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allowfullscreen', 'scrolling'] })
                }}
              />
            </div>
          )}
          {/* View All link moved to header */}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
