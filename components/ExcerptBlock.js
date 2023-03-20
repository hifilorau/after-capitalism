import styles from '../styles/Home.module.scss'
import Link from 'next/link'
// import DOMPurify from 'dompurify'
import DOMPurify from 'isomorphic-dompurify';



const ExcerptBlock = ({setIsOpen, excerpt}) => {
  console.log('ESCERPT', excerpt)
  const content = DOMPurify.sanitize(excerpt.rendered)
  // console.log('EX', excerpt)
  return (
    <div className={styles.excerptBlock}>
      <h2>Read an Excerpt</h2>
      {/* <p>Olupite ma nos aperci sapid qui velique vento de volo blabo. Nam, que voluptas explaut faccae. Et iumquiae dolor repuda esed quiandento que est quia explania vernatatusam autatquam aut earuntis dolor seditat iuscipsam resseque pe nonsequ assima quo omnis iur solupienda comnimus eos acerepudam erovit volendi doluptur, sam rem. Ectati qui quod quam idit il ipsus atem.</p> */}
      {excerpt && <div className={styles.excerptHTML} dangerouslySetInnerHTML={{ __html: content }} /> }
      <Link href="/read-more">
        <a className={styles.buttonLink}>
          Read More
        </a>
      </Link>
    </div>
    )
}

export default ExcerptBlock