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
  link: ''
},
{
  storeName: 'Apple',
  link: ''
},
{
  storeName: 'Barnes & Noble',
  link: ''
},
{
  storeName: 'Books A Million',
  link: ''
}]

export default function Home({aCPosts}) {
  const [posts, setPosts] = useState([]);
  const [tweets, setTweets] = useState([]);
  const context = useContext(ModalContext)


  useEffect(() => {
      async function loadPosts() {
        try {
          const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts');
          if(!response.ok) {
           // oups! something went wrong
              return;
          }
  
          const posts = await response.json();
          setPosts(posts);
        } catch (e){
          console.log(e.message)
        }
       
      }
      loadPosts();
 }, [])

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
        <h2>Expected to Publish Fall 2023</h2>
        <ul className={styles.booksUl}>
          {books && books.map((book) => {
            return (
              <li key={book.storeName}>
                <div onClick={ (event) => event.preventDefault() }>
                  <div className={styles.buttonLink}>
                    {book.storeName}
                  </div>
                </div>
              </li>
            )})
          }
        </ul>
      </div>
      <div className={styles.excerptAndSignup}>
          <ExcerptBlock setIsOpen={context.setIsOpen} />
          <SignUp />
      </div>

 
      {/* <Testimonials /> */}
     
      {posts && <Monitoring posts={posts} aCPosts={aCPosts}/> }
      

      <Footer />
    </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const response = await fetch('https://andyhinesight.com/wp-json/wp/v2/posts?posts?categories=after-capitalism&per_page=5');
  if(!response.ok) {
      // oups! something went wrong
      console.log('ERRRO')
      return {
        props: {error: response.error} || "error"
      };
  }

  const posts = await response.json();
  console.log('resoonse', posts)
  return {
    props: {aCPosts: posts}, // will be passed to the page component as props
  }
}




