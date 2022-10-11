import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'

const socials = [
  {url: 'https://www.facebook.com/andyhines.futurist/',
   title: 'Facebook',
   imgUrl: "/socials/facebook.svg"
  },
  {url: 'https://twitter.com/futurist_Ahines',
   title: 'Twitter',
   imgUrl: "/socials/twitter.svg"
  },
  {url: 'https://www.linkedin.com/in/andyhinesight/',
   title: 'LinkedIn',
   imgUrl: "/socials/linkedin.svg"
  },
  {url: 'https://www.youtube.com/c/AndyHines',
   title: 'YouTube',
   imgUrl: "/socials/youtube.svg"
  },
  {url: 'https://www.instagram.com/futurist_ahines/',
   title: 'Instagram',
   imgUrl: "/socials/insta.svg"
  },
]

const Author = () => {
  return (
    <div className={styles.author}>
          <Image src="/andy.png" width={300} height={200}/>
          <h3>Dr. Andy Hines</h3>
          <div>Author + Badass</div>
          <p style={{marginBottom: '1em'}}>About the author very short intro with a button to expand for more text. Lorem Epsom dolor sit nonummy. Pe ma cus ipitatur audaestim ea conetur. Quiae sus alibusaerrum facero de veristi busapie ndelest parumet idel ilit volorepuda quae repera non resequi doluptas quidestisto enimos volorero omnihil luptate nimet qui dolore netur, quam sitatur sam a num elescil icipient odionsed minus esti culloreriae consequat in nisqui assed quunt, sam es quidus et ad eost, nonse ped moluptatio. Culpa suntia.</p>

          <div>
            <Image src="/sig.png" width={1000} height={249} layout="responsive"/>
          </div>
          <Link href="/">
            <a className={styles.exReadMore}>
              Read More
            </a>
          </Link>
          <ul className={styles.socialLinks}>
            {socials.map((social) => {
              return (
              <li key={social.name}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  <img src={social.imgUrl}/>
                </a>
            </li>
              )
            })
          }
          </ul>
      </div>
  )
}

export default Author