import styles from '../../styles/Home.module.scss' 
import React, {useContext} from 'react'
import Image
 from 'next/image'
import PageLayout from '../../components/PageLayout'
import Footer from '../../components/footer'
import Modal from '../../components/Modal'
import { ModalContext } from '../../components/ModalContext'
import DOMPurify from 'isomorphic-dompurify';


const Reviews = ({review}) => {
  const context = useContext(ModalContext)
  console.log('REV', review)
  const content = review[0].content.rendered || null
  const title = review[0].title.rendered || ""
  // console.log('page', page)
  // <div className={styles.blogWrapper}>
  //   <div className={styles.header}>
  //       <div className={styles.banner}>
  //         <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
  //       </div>
  //      <BlogHeader content={post} />
  //     </div>
 
 return (
  <div>
      {context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
      <div className={styles.header}>
        <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div>
       <PageLayout>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />

       </PageLayout>
      </div>    
      <Footer />
  </div>
 )
}

export default Reviews

export async function getServerSideProps(context) {
  console.log('CONTE', context)
  const slug = context.query.slug
  const response = await fetch(`https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts?slug=${slug}`);
  if(!response.ok) {
      // oups! something went wrong
      console.log('ERRRO')
      return {
        props: {error: response.error} || "error"
      };
  }

  const post = await response.json();
  console.log('resoonse', post)
  return {
    props: {review: post}, // will be passed to the page component as props
  }
}




