import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import {posts} from '../lib/testimonials'


const Monitoring = () => {
  console.log('POSTS', posts)
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
            <li key={post.name}>
              <div className={post.imgUrl ? styles.postImgWrap : styles.postNoImgWrap}>
                
              </div>
              <h4>{post.name}</h4>
              <p>{post.description}</p>
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