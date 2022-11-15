import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'
import Author from './Author'


const PageLayout = ({content, children}) => {
  return (
    <div className={styles.headerContent}>
      <div className={`${styles.excerpt}`}>
      {children}
      </div>

      <Author />
    </div>
  )
}

export default PageLayout


 