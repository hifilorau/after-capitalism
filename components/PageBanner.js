import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const PageBanner = () => {
 return (
  // <div>
         <div className={styles.pageBanner}>
          <Image src="/rectangle.png" layout="responsive" width={1440} height={580}/>
          <div className={styles.pageHome}>
          <Link href="/">
            {/* <a> */}
            {/* HOME */}
              <img className={styles.homeLinkImg}src="/ac_logo.png"/>
            {/* </a> */}
          </Link>
          </div>
        </div>
  // </div>
 )
}

export default PageBanner