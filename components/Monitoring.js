import styles from '../styles/Home.module.scss'
import Link from 'next/link'
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
          {posts && posts.map((post) => {
            return (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                <div className={post.jetpack_featured_media_url ? styles.postImgWrap : styles.postNoImgWrap}>
                 {post.jetpack_featured_media_url && 
                 <div className={styles.featureImg}>
                    <img src={post.jetpack_featured_media_url} /> 
                </div>
                }
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