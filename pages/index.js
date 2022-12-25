import React, {useState, useEffect, useContext} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import HeaderContent from '../components/HeaderContent'
import ExcerptBlock from '../components/ExcerptBlock'
import Footer from '../components/footer'
import SignUp from '../components/Signup'
import Testimonials from '../components/Testimonials'
import Monitoring from '../components/Monitoring'
import Link from 'next/link'
import Modal from '../components/Modal'
import { ModalContext } from '../components/ModalContext'

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
  const [posts, setPosts] = useState([]);
  const [tweets, setTweets] = useState([]);
  const context = useContext(ModalContext)
  console.log('CONTEXT', context.isOpen)


  useEffect(() => {
      async function loadPosts() {
        try {
          const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts');
          if(!response.ok) {
           // oups! something went wrong
              return;
          }
  
          const posts = await response.json();
          console.log('POSTS', posts)
          setPosts(posts);
        } catch (e){
          console.log(e.message)
        }
       
      }
      // async function getTweets() {
      //   console.log('TWEETING')
      //   const response = await fetch('api/tweets');
      //   if(!response.ok) {
      //     // oups! something went wrong
      //        return;
      //    }
 
      //    const tweets = await response.json();
      //    console.log('TWEETS', tweets)
      //    setTweets(tweets);
      // }
      loadPosts();
      // getTweets()
 }, [])

   console.log('POSTS', posts)
  return (
    <>
    {context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
    <Head>
      <title>Imagining After Capitalism</title>
      <meta name="description" content="Andy Hines' new book Imagining After Capitalism explores a world after capitalism. " />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      <div className={styles.header}>
        <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div>
        <HeaderContent />
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
          <ExcerptBlock setIsOpen={context.setIsOpen} />
          <SignUp />
      </div>

 
      <Testimonials />
     
      {posts && <Monitoring posts={posts}/> }
      

      <Footer />
    </div>
    </>
  )
}



