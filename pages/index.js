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
import NewsModal from '../components/NewsModal'
import { ModalContext } from '../components/ModalContext'

const books = [
  {
    storeName: "Triarchy Press",
    link: "https://www.triarchypress.net/after.html"
  },
  {
  storeName: 'Amazon',
  link: `https://www.amazon.com/Imagining-After-Capitalism-Andy-Hines/dp/1917251033/ref=sr_1_1?dib=eyJ2IjoiMSJ9.zkFq3AJEAkqzg1MWj69Xog.lWWCe4kL_URcM65NUjuNJZZyRp1zli0WMzn9PlXDRro&dib_tag=se&keywords=9781917251037&linkCode=qs&qid=1731257673&s=books&sr=1-1`,
  preOrder: true,
  paperBack: false,
},
{
  storeName: 'Google Books',
  link: 'https://urldefense.com/v3/__https:/www.google.com/books/edition/IMAGINING_AFTER_CAPITALISM/nWHs0AEACAAJ?hl=en__;!!LkSTlj0I!C7v04Cg7f9D1wHfZf-EAgVoD-VpqVBubF-7Sijq_LP6X2fRFErJ9EDQttUMVo-lnvTYc6BU6HOaPZZUiX4jk3Rg$',
  preOrder: true,
  paperBack: false,
},
{
  storeName: 'International Publishers Group',
  link: 'https://urldefense.com/v3/__https:/www.ipgbook.com/search-pages-21.php?search_term=IMAGINING*AFTER*CAPITALISM__;Kys!!LkSTlj0I!C7v04Cg7f9D1wHfZf-EAgVoD-VpqVBubF-7Sijq_LP6X2fRFErJ9EDQttUMVo-lnvTYc6BU6HOaPZZUiSHPfVEM$',
  preOrder: true,
  paperBack: false,
},
{
  storeName: 'Barnes & Noble',
  link: 'https://www.barnesandnoble.com/w/imagining-after-capitalism-andy-hines/1146320342?ean=9781917251037',
  preOrder: true,
  paperBack: false,
},
{
  storeName: 'Books A Million',
  link: 'https://www.booksamillion.com/product/9781917251037',
  preOrder: true,
  paperBack: false,
}]

export default function Home({aCPosts, reviews, error, excerpt}) {
  const [posts, setPosts] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [showNewsModal, setShowNewsModal] = useState(true);
  const [newsContent, setNewsContent] = useState('');
  const [newsLoading, setNewsLoading] = useState(true);
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

  // Fetch news content for the modal
  useEffect(() => {
    const fetchNewsContent = async () => {
      if (typeof window === 'undefined') return; // Only run on client-side
      
      try {
        setNewsLoading(true);
        const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/pages?slug=news-and-media');
        if (!response.ok) {
          throw new Error('Failed to fetch news and media page');
        }
        
        const data = await response.json();
        if (data && data.length > 0) {
          // Parse the HTML content to extract the first few events/news items
          const fullContent = data[0].content.rendered;
          
          // Create a DOM parser to work with the HTML content
          const parser = new DOMParser();
          const doc = parser.parseFromString(fullContent, 'text/html');
          
          // Find content sections that might have images
          // First look for the UPCOMING EVENTS section
          const eventHeading = Array.from(doc.querySelectorAll('h3')).find(el => 
            el.textContent.includes('UPCOMING EVENTS'));
          
          // Create a section container to hold a substantial portion of content with images
          if (eventHeading) {
            const contentContainer = document.createElement('div');
            
            // First add the heading
            contentContainer.appendChild(eventHeading.cloneNode(true));
            
            // Then capture a good amount of content after the heading (enough for images and text)
            let currentNode = eventHeading;
            let elementCount = 0;
            const MAX_ELEMENTS = 15; // Capture more elements to ensure we get images
            
            while (currentNode.nextElementSibling && elementCount < MAX_ELEMENTS) {
              const nextElement = currentNode.nextElementSibling;
              contentContainer.appendChild(nextElement.cloneNode(true));
              currentNode = nextElement;
              elementCount++;
            }
            
            // Set the content with all the HTML preserved
            setNewsContent(contentContainer.innerHTML);
          
          } else {
            // If we can't find the "UPCOMING EVENTS" section, just take the first part of the content
            setNewsContent(fullContent.substring(0, 1000) + '...');
          }

          // Check if modal should be shown this session
          const modalShownThisSession = sessionStorage.getItem('newsModalShown');
          if (!modalShownThisSession) {
            setShowNewsModal(true);
            sessionStorage.setItem('newsModalShown', 'true');
          }
        }
      } catch (error) {
        console.error('Error fetching news content:', error);
        setNewsContent('<p>Failed to load news and media content.</p>');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNewsContent();
  }, [])

  return (
    <>
    {context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
    {showNewsModal && !newsLoading && <NewsModal setIsOpen={setShowNewsModal} newsContent={newsContent}/>}
    <Head>
      <title>Imagining After Capitalism</title>
      <meta name="description" content="Andy Hines' new book Imagining After Capitalism explores a world after capitalism. " />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="home-page">
      <div className={styles.header}>
        <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580} alt="Banner image"/>
        </div>
        <HeaderContent />
      </div>
     
      <div className={styles.bookLinks}>
        <div className={styles.squigglyWrapper}>
          <Image src="/squigglys.png" width={1800} height={270} layout="fill" alt="Decorative squiggly lines"/>
        </div>
        {/* <h2>Limited Paperback and E-books Currently Available from Publisher</h2> */}
        <div className={styles.booksUl}>

   
        {/* <h2>E-Book Now Available [limited]  & Paperback Launching February 10, 2025.</h2> */}
        </div>
        <h3 className={styles.bookSubheader}> Available  on:</h3>
        <ul className={styles.booksUl}>
          {books && books.map((book) => {
            return (
              <li key={book.storeName}>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <div className={styles.buttonLink}>
                    {book.storeName}
                  </div>
                </a>
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
  return {
    props: {aCPosts: posts.slice(0,6), error, reviews, excerpt}, // will be passed to the page component as props
  }
}




