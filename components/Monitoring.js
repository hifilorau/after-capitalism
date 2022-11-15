import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
// import {posts} from '../lib/testimonials'


const Monitoring = ({posts}) => {
  // console.log('POSTS', posts)
  return (
    <div className={styles.monitoring}>
      <div className={styles.monitorBreak}>
        <div className={styles.moniLine}></div>
        <h3>Monitoring the Shift</h3>
        <div className={styles.moniLine}></div>
      </div>
      <ul className={styles.postsUl}>
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