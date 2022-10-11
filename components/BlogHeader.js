import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'
import Author from './Author'


const BlogHeader = ({content}) => {
  return (
    <div className={styles.headerContent}>
      <div className={`${styles.excerpt}`}>
        <h2>{content.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: content.content.rendered }} />   
      </div>

      <Author />
    </div>
  )
}

export default BlogHeader


 