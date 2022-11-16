import styles from '../styles/Home.module.scss' 
import React, {useContext} from 'react'
import Image
 from 'next/image'
import PageLayout from '../components/PageLayout'
import Footer from '../components/footer'
import Modal from '../components/Modal'
import { ModalContext } from '../components/ModalContext'
import DOMPurify from 'dompurify'

const Why = ({page}) => {
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

export default Why

export async function getServerSideProps(context) {

  const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/pages?slug=why-i-wrote-it');
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


