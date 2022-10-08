import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'


const BlogHeader = ({content}) => {
  return (
    <div className={styles.headerContent}>
      <div className={`${styles.excerpt}`}>
      <h2>{content.title.rendered}</h2>
      <div dangerouslySetInnerHTML={{ __html: content.content.rendered }} />
         
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
            <a href="">
              <img src=""/>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BlogHeader


 