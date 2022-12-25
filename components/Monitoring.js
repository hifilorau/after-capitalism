import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Timeline } from 'react-twitter-widgets'

// import {posts} from '../lib/testimonials'


const Monitoring = ({posts}) => {
  const recentPost = posts[0]
  console.log('POSTS', recentPost)
  return (
    <div className={styles.monitoring}>
      <div className={styles.monitorBreak}>
        <div className={styles.moniLine}></div>
        <h3>Monitoring the Shift</h3>
        <div className={styles.moniLine}></div>
      </div>
      <ul className={styles.postsUl}>
      {recentPost && <li key={recentPost.id}>
            <Link href={`/monitoring/${recentPost.slug}`}>
              <a>
              <div className={styles.postImgWrap}>
        
                <div className={styles.featureImg}>
                  <img src={recentPost.jetpack_featured_media_url ? recentPost.jetpack_featured_media_url : "/fallback.png"} /> 
              </div>
  
              </div>
              <h4>{recentPost.title.rendered}</h4>
              <p>{recentPost.description}</p>
              </a>
            </Link>
          </li> }
          <li key="rt-w">
          <Link href={`/news-and-media`}>
            <a>
              <div className={styles.postImgWrap}>
                <div className={styles.featureImg}>
                  <img src="/fallback.png" /> 
              </div>

              </div>
              <h4>News and Media</h4>
              {/* <p>Real time insights into the shift after capitalism</p> */}
            </a>
        </Link>
      </li>
      {/* <li key="rt-w">
          <Link href={`/why-i-wrote-it`}>
          <a>
            <div className={styles.postImgWrap}>
              <div className={styles.featureImg}>
                <img src="/fallback.png" /> 
            </div>

            </div>
            <h4>Why I Wrote It</h4>
          </a>
        </Link>
      </li> */}
      <li key="rt-d">
          <Link href={`/delphi`}>
            <a>
            <div className={styles.postImgWrap}>
              <div className={styles.featureImg}>
                <img src="/real-time-delphi-banner.png" /> 
            </div>

            </div>
            <h4>Real Time Delphi</h4>
            {/* <p>Real time insights into the shift after capitalism</p> */}
            </a>
          </Link>
        </li>
        <li key="rt-faq">
          <Link href={`/faqs`}>
            <a>
            <div className={styles.postImgWrap}>
              <div className={styles.featureImg}>
                <img src="/fallback.png" /> 
            </div>

            </div>
            <h4>FAQS</h4>
            {/* <p>Real time insights into the shift after capitalism</p> */}
            </a>
          </Link>
        </li>
        <li key="rt-ab">
          <Link href={`/bibliography`}>
            <a>
            <div className={styles.postImgWrap}>
              <div className={styles.featureImg}>
                <img src="/fallback.png" /> 
            </div>

            </div>
            <h4>Annotated Bibliography</h4>
            {/* <p>Real time insights into the shift after capitalism</p> */}
            </a>
          </Link>
        </li>
        {/* {posts && posts.map((post) => {
          
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
        })} */}
         <li key="rt-ab">
          <Link href={`/bibliography`}>
          <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'futurist_ahines'
            }}
            options={{
              height: '200'
            }}
          />
          </Link>
        </li>
       
      </ul>
      {/* <h2>Read an Excerpt</h2>
      <p>Olupite ma nos aperci sapid qui velique vento de volo blabo. Nam, que voluptas explaut faccae. Et iumquiae dolor repuda esed quiandento que est quia explania vernatatusam autatquam aut earuntis dolor seditat iuscipsam resseque pe nonsequ assima quo omnis iur solupienda comnimus eos acerepudam erovit volendi doluptur, sam rem. Ectati qui quod quam idit il ipsus atem.</p>
      <Link href="/">
        <a className={styles.buttonLink}>
          Read More
        </a>
      </Link> */}
    </div>
    )
}

export default Monitoring