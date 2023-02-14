import styles from '../styles/Home.module.scss'
import Link from 'next/link'



const ExcerptBlock = ({setIsOpen}) => {
  return (
    <div className={styles.excerptBlock}>
      <h2>Read an Excerpt</h2>
      <p>Olupite ma nos aperci sapid qui velique vento de volo blabo. Nam, que voluptas explaut faccae. Et iumquiae dolor repuda esed quiandento que est quia explania vernatatusam autatquam aut earuntis dolor seditat iuscipsam resseque pe nonsequ assima quo omnis iur solupienda comnimus eos acerepudam erovit volendi doluptur, sam rem. Ectati qui quod quam idit il ipsus atem.</p>
      <Link href="/read-more">
        <a className={styles.buttonLink}>
          Read More
        </a>
      </Link>
    </div>
    )
}

export default ExcerptBlock