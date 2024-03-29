import styles from '../styles/Home.module.scss' 
import React, {useContext} from 'react'
import Image
 from 'next/image'
import PageLayout from '../components/PageLayout'
import Footer from '../components/footer'
import Modal from '../components/Modal'
import { ModalContext } from '../components/ModalContext'
import DOMPurify from 'isomorphic-dompurify';


const NandM = ({page}) => {
  const context = useContext(ModalContext)
  const content = page[0].content.rendered || null
  const title = page[0].title.rendered || ""
  console.log('page', page)
  // <div className={styles.blogWrapper}>
  //   <div className={styles.header}>
  //       <div className={styles.banner}>
  //         <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
  //       </div>
  //      <BlogHeader content={post} />
  //     </div>
 
 return (
  <div className="news">
      {context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
      <div className={styles.header}>
        {/* <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div> */}
       <PageLayout>
        <h3>{title}</h3>
       <div className="wp-news" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allowfullscreen', 'scrolling'] }) }} />

       </PageLayout>
      </div>    
      <Footer />
  </div>
 )
}

export default NandM

export async function getServerSideProps(context) {

  const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/pages?slug=news-and-media');
  // console.log('resoonse', response)
  if(!response.ok) {
      // oups! something went wrong
      console.log('ERRRO')
      return {
        props: {error: response.error} || "error"
      };
  }

  const page = await response.json();
  console.log('resoonse', page)
  return {
    props: {page}, // will be passed to the page component as props
  }
}


