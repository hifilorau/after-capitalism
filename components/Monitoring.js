import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Timeline } from 'react-twitter-widgets'

// import {posts} from '../lib/testimonials'


const Monitoring = ({posts, aCPosts, reviews}) => {
  const recentPost = posts[0]
  return (
    <div className={styles.monitoring}>
      <div className={styles.monitorBreak}>
        <div className={styles.moniLine}></div>
        <h3>Monitoring the Shift</h3>
        <div className={styles.moniLine}></div>
      </div>
      <ul className={styles.postsUl}>
        {aCPosts && 
        <li key="ac-posts" className={styles.acPost}>
          <div className={styles.postImgWrap} style={{background: 'linear-gradient(90deg, rgba(226,33,38,1) 65%, rgba(255,255,255,1) 100%)'}}>
            <ul>
            <h4>After Capitalism Blog Posts</h4>
            {aCPosts.map((x) => {
                  return (
                    <li className={styles.acPosts} key={x.title.rendered}>
                      <a href={x.link} target="_blank" rel="noreferrer">
                        {x.title.rendered}
                      </a>
                    </li>
                  )
                })}  
            </ul>
          </div>
         <h4 style={{color: "#e22226"}}>After Capitalism Blog Posts</h4>
      </li> }
      <li key="rt-w">
        <Link href={`/news-and-media`}>
          <a>
            <div className={styles.postImgWrap}>
              <div className={styles.featureImg}>
                <img src="/powertools.jpg" /> 
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
              {/* <div className={styles.featureImg}>
                <img src="/real-time-delphi-banner.png" /> 
              </div> */}
              <div style={{padding: '1em'}}>
                <h3 style={{margin: "0"}}>Real Time Delphi</h3>
                <p>Collecting and Synthesizing Expert Judgements</p>
              </div>
             

            </div>
            <h4>Real Time Delphi</h4>
            {/* <p>Real time insights into the shift after capitalism</p> */}
            </a>
          </Link>
        </li>

        {reviews && <li key="reviews" className={styles.acPost}>
        <div className={styles.postImgWrap} style={{background: 'linear-gradient(90deg, rgba(226,33,38,1) 65%, rgba(255,255,255,1) 100%)'}}>
          <ul>
          <h4>Reviews</h4>
          {reviews.map((x) => {
                return (
                  <li className={styles.acPosts} key={x.title.rendered}>
                    <Link href={`/reviews/${x.slug}`} target="_blank" rel="noreferrer">
                      {x.title.rendered}
                    </Link>
                  </li>
                )
              })}  
          </ul>
        </div>
         <h4 style={{color: "#e22226"}}>Reviews</h4>
      </li> }
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
         <li key="rt-tweets" style={{height: '200px', overflow: 'scroll'}}>
          {/* <Link href={`/bibliography`}> */}
          {/* <Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'futurist_ahines'
            }}
            options={{
              height: '200'
            }}
          /> */}
          <a className="twitter-timeline" href="https://twitter.com/futurist_Ahines?ref_src=twsrc%5Etfw">Tweets by futurist_Ahines</a> 
          <script async src="https://platform.twitter.com/widgets.js"></script>
          {/* </Link> */}
          {/* <h4>Tweets</h4> */}
        </li>
       
      </ul>

    </div>
    )
}

export default Monitoring