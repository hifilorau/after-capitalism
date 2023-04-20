import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const PageBanner = () => {
 return (
  // <div>
         <div className={styles.pageBanner}>
            <img src="/rec-2.png" layout="responsive" width={1440} height={580}/>
         
      
        </div>
  // </div>
 )
}

export default PageBanner