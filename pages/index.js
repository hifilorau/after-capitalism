import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import HeaderContent from '../components/HeaderContent'
import ExcerptBlock from '../components/ExcerptBlock'
import SignUp from '../components/Signup'
import Testimonials from '../components/Testimonials'
import Monitoring from '../components/Monitoring'
import Link from 'next/link'

const books = [{
  storeName: 'Amazon',
  link: 'www.amazon.com/andy'
},
{
  storeName: 'Apple',
  link: 'www.amazon.com/andy'
},
{
  storeName: 'Barnes & Noble',
  link: 'www.amazon.com/andy'
},
{
  storeName: 'Books A Million',
  link: 'www.amazon.com/andy'
}]


export default function Home() {


  return (
    <>
    <Head>
    <title>Create Next App</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div>
      <div className={styles.header}>
        <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div>
        <HeaderContent/>
      </div>
      
      <div className={styles.bookLinks}>
        <div className={styles.squigglyWrapper}>
          <Image src="/squigglys.png" width={1800} height={270} layout="fill"/>
        </div>
        <h2>Available For Order or Download</h2>
        <ul className={styles.booksUl}>
          {books && books.map((book) => {
            return (
              <li key={book.storeName}>
                <Link href={book.link}>
                  <a className={styles.buttonLink}>
                    {book.storeName}
                  </a>
                </Link>
              </li>
            )})
          }
        </ul>
      </div>
      <div className={styles.excerptAndSignup}>
          <ExcerptBlock />
          <SignUp />
      </div>

 
      <Testimonials />
     
      <Monitoring />
      

      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
    </>
  )
}
