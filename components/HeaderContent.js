import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'


const HeaderContent = () => {
  return (
    <div className={styles.headerContent}>
      <div className={`${styles.excerpt}`}>
        <p>You may well be among the many believing that it easier to imagine the end of the world than the end of capitalism (ironically, those two concepts may be related according to some).
        </p>
        <div className={styles.quoteBlock}>
          <div className={styles.vertLine}></div>
          <div>
            <p>
              The important news is that we have no choice but to develop alternatives, because capitalism is dying.
            </p>
            <p>
              The bad news is that it is going to be long, tough ride for at least the next several years, if not longer, and a “good” future is, by no means guaranteed.
            </p>
            <p>The good news is that there are indeed viable guiding images of life after capitalism.
            </p>
          </div>
        </div>
       
        <p>You may well be among the many believing that it easier to imagine the end of the world than the end of capitalism (ironically, those two concepts may be related according to some).As a futurist, it's my job to help craft meaningful images of the future that provide a guiding ideal that makes embarking on the long journey worth it. I chronicle the most pressing problems of the day to show it is time for a new conception of the future, then outline a pathway to three positive guiding images of a transformed society. The images developed for this work each focus on a different aspect of society —ecological preservation, socio-economic justice, and technological metamorphosis. We will refer to these positive images as Circular Commons, Tech-Led Abundance, and Non-Workers Paradise. In this book we will explore the possibilities these new images of the future offer and provide you with a glimpse into what After Capitalism might look like.
  
        </p>
      </div>
        <div className={styles.author}>
        <Image src="/andy.png" width={300} height={200}/>
        <h3>Dr. Andy Hines</h3>
        <div>Author + Badass</div>
        <p>About the author very short intro with a button to expand for more text. Lorem Epsom dolor sit nonummy. Pe ma cus ipitatur audaestim ea conetur. Quiae sus alibusaerrum facero de veristi busapie ndelest parumet idel ilit volorepuda quae repera non resequi doluptas quidestisto enimos volorero omnihil luptate nimet qui dolore netur, quam sitatur sam a num elescil icipient odionsed minus esti culloreriae consequat in nisqui assed quunt, sam es quidus et ad eost, nonse ped moluptatio. Culpa suntia.</p>

        <div>Signature</div>
        <Link href="/">
          <a className={styles.exReadMore}>
            Read More
          </a>
        </Link>
        <ul className={styles.socialLinks}>
          <li>
            <a href="/">
              <img src=""/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderContent


 