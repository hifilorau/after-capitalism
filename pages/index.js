import React, {useState, useEffect, useContext} from 'react'
import { parseNewsContent } from '../utils/contentParser';
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
  const [newsData, setNewsData] = useState(null);
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
          
          // Find content sections
          // First look for the UPCOMING EVENTS section
          const upcomingEventsHeading = Array.from(doc.querySelectorAll('h3')).find(el => 
            el.textContent.includes('UPCOMING EVENTS'));
          
          // Look for RECENT ACTIVITIES section
          const recentActivitiesHeading = Array.from(doc.querySelectorAll('h3')).find(el => 
            el.textContent.includes('RECENT ACTIVITIES') || el.textContent.includes('RECENT ACTIVITY'));
          
          // Create containers for both sections
          const upcomingEventsContainer = document.createElement('div');
          const recentActivitiesContainer = document.createElement('div');
          
          // Process UPCOMING EVENTS section
          if (upcomingEventsHeading) {
            const upcomingH3 = upcomingEventsHeading.cloneNode(true);
            // Remove margin-top from the upcoming events h3
            upcomingH3.style.marginTop = '0';
            upcomingEventsContainer.appendChild(upcomingH3);
            
            // Capture content after the heading
            let currentNode = upcomingEventsHeading;
            let elementCount = 0;
            const MAX_ELEMENTS = 10;
            
            // Continue until we hit the next heading or reach max elements
            while (currentNode.nextElementSibling && 
                  elementCount < MAX_ELEMENTS) {
              const nextElement = currentNode.nextElementSibling;
              
              // Stop if we reach the RECENT ACTIVITIES heading
              if (nextElement === recentActivitiesHeading) {
                break;
              }
              
              // Stop if we reach any other heading (h1, h2, h3)
              if (nextElement.tagName.match(/^H[1-3]$/i)) {
                break;
              }
              
              upcomingEventsContainer.appendChild(nextElement.cloneNode(true));
              currentNode = nextElement;
              elementCount++;
            }
          }
          
          // Process RECENT ACTIVITIES section
          if (recentActivitiesHeading) {
            // Add the heading
            recentActivitiesContainer.appendChild(recentActivitiesHeading.cloneNode(true));
            
            // Capture content after the heading
            let currentNode = recentActivitiesHeading;
            let elementCount = 0;
            const MAX_ELEMENTS = 10;
            
            while (currentNode.nextElementSibling && elementCount < MAX_ELEMENTS) {
              const nextElement = currentNode.nextElementSibling;
              recentActivitiesContainer.appendChild(nextElement.cloneNode(true));
              currentNode = nextElement;
              elementCount++;
            }
          }
          
          // Create a wrapper to hold both sections
          const contentWrapper = document.createElement('div');
          contentWrapper.setAttribute('data-sections', 'true');
          contentWrapper.className = 'ra-ue-container';
          
          // Add the sections to the wrapper with appropriate data attributes
          upcomingEventsContainer.setAttribute('data-section', 'upcoming-events');
          upcomingEventsContainer.className = 'upcoming-events';
          recentActivitiesContainer.setAttribute('data-section', 'recent-activities');
          recentActivitiesContainer.className = 'recent-activities';
          
          
          contentWrapper.appendChild(upcomingEventsContainer);
          contentWrapper.appendChild(recentActivitiesContainer);
          
          // Clean up WordPress inline styles before setting the content
          let cleanedContent = contentWrapper.innerHTML;
          
          // Remove inline border styles from paragraphs
          cleanedContent = cleanedContent.replace(/(<p[^>]*)style="[^"]*border[^"]*"/g, '$1');
          cleanedContent = cleanedContent.replace(/style="([^"]*)border[^;]*;([^"]*)"/g, 'style="$1$2"');
          
          // Set the content with all the HTML preserved and inline styles cleaned
          setNewsContent(cleanedContent);
          
          // Parse the content into structured data for React components
          try {
            const parsedData = parseNewsContent(fullContent);
            setNewsData(parsedData);
            console.log('Parsed news data:', parsedData);
          } catch (parseError) {
            console.error('Error parsing news content:', parseError);
            // Fall back to HTML content if parsing fails
          }
          
          // If we couldn't find either section, just take the first part of the content
          if (!upcomingEventsHeading && !recentActivitiesHeading) {
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
    {showNewsModal && !newsLoading && (
      <NewsModal 
        setIsOpen={setShowNewsModal} 
        newsContent={newsContent} 
        newsData={newsData}
      />
    )}
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




