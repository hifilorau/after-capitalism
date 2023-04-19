import styles from '../styles/Home.module.scss' 
import React, {useContext} from 'react'
import Image
 from 'next/image'
import PageLayout from '../components/PageLayout'
import Footer from '../components/footer'
import Modal from '../components/Modal'
import { ModalContext } from '../components/ModalContext'
import DOMPurify from 'dompurify'
import Link from 'next/link'

const AllPosts = ({posts}) => {
  const context = useContext(ModalContext)

  console.log('posts', posts)
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
        {/* <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div> */}
       <PageLayout>
        <h3>All Posts</h3>
        <ul>
        {posts && posts.map((post) => {
          return (
          <li key={post.id}>
            <Link href={`/monitoring/${post.slug}`}>
              <a>
              <div className={styles.postImgWrap}>
        
                <div className={styles.featureImg}>
                  <img src={post.jetpack_featured_media_url ? post.jetpack_featured_media_url : "/fallback.png"} /> 
              </div>
  
              </div>
              <h4>{post.title.rendered}</h4>
              <p>{post.description}</p>
              </a>
            </Link>

          </li>
          )
        })}
        </ul>

       </PageLayout>
      </div>    
      <Footer />
  </div>
 )
}

export default AllPosts

export async function getServerSideProps(context) {

  const response = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts');
  // console.log('resoonse', response)
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
    props: {posts}, // will be passed to the page component as props
  }
}


