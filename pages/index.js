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

export default function Home({aCPosts, reviews, error, excerpt}) {
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
    <div className="home-page">
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
        <h2>Expected to Publish Fall 2024</h2>
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
          <ExcerptBlock setIsOpen={context.setIsOpen} excerpt={excerpt} />
          <SignUp />
      </div>

 
      {/* <Testimonials /> */}
     
      {posts && <Monitoring posts={posts} aCPosts={aCPosts} reviews={reviews}/> }
      

      <Footer />
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  let error = [];
  const response = 
  await fetch('https://andyhinesight.com/wp-json/wp/v2/posts?categories=1041');
  // await fetch('https://andyhinesight.com/wp-json/wp/v2/categories')
  if(!response.ok) {
      // oups! something went wrong
      error.push(response.error)
      console.log('ERRRO')
    
  }

  const reviewsRes = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts?categories=7');
  if(!reviewsRes.ok) {
    // oups! something went wrong
    error.push(response.error)
    console.log('ERRRO')  
  }

  const excerptRes = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/pages?slug=read-an-excerpt');
  const reviews = await reviewsRes.json()
  const posts = await response.json();
  const excerptData = await excerptRes.json()
  const excerpt = excerptData[0].content 
  console.log('resoonse', excerpt)
  return {
    props: {aCPosts: posts.slice(0,6), error, reviews, excerpt}, // will be passed to the page component as props
  }
}




