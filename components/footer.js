import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'


const Footer = () => {
  return (  <footer className={`${styles.footer}`}>
  <div className={styles.squigglyWrapper}>
      <Image src="/squigglys.png" width={1800} height={270} layout="fill"/>
  </div>
   
  <Link
      href="/"
    >Home
    </Link>
    {/* <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    > Resources
    </a> */}
    <Link
      href="/faqs"
    >FAQs
    </Link>
    <Link
      href="/bibliography"
    >Media Links
    </Link>
  </footer>)
}

export default Footer