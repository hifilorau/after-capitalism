import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'
import Author from './Author'
import PageBanner from './PageBanner'


const PageLayout = ({content, children}) => {
  return (
    <>
     <PageBanner />
     <div className={styles.pageContent}>
     
     <div className={`${styles.pageExcerpt}`}>
     {children}
     </div>
    <div className={styles.benBottom}><img src="/benNoText.png"/></div>
     {/* <Author /> */}
   </div>
    </>
   
  )
}

export default PageLayout


 