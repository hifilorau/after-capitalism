'use client';
import styles from '../styles/Home.module.scss';

export default function VideoPlayer() {
  return (
    <div className={styles.videoContainer}>
      <video
        src="/videos/imagining_after_capitalism_book_video_184.mp4"
        controls
        preload="metadata"
        className={styles.videoPlayer}
        poster="/videos/imagining_after_capitalism_book_video_184.jpg"
      />
    </div>
  );
}