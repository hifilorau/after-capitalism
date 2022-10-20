import React, {useContext} from 'react'
import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'
import { ModalContext } from '../components/ModalContext'

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
  const context = useContext(ModalContext)

  return (
    <div className={styles.author}>
          <div className={styles.authorImage}>
           <Image src="/andy.png" width={300} height={200}/>
          </div>
          <h3>Dr. Andy Hines</h3>
          <h4>Author + Badass</h4>
          <p style={{marginBottom: '1em'}}>Andy Hines brings more than three decades of experience as a futurist to the Imagining After Capitalism work. He has explored the future from multiple vantage points. He is currently Associate Professor and Program Coordinator at the University of Houston Foresight program. He also spent a decade as an organizational futurist, first with Kellogg’s and then Dow Chemical. His consulting futurists roles included   Coates & Jarratt, Inc., Social Technologies/Innovaro and currently his own firm Hinesight.</p>

          <div>
            <Image src="/sig.png" width={1000} height={249} layout="responsive"/>
          </div>
          <div className={styles.exReadMore} onClick={() => context.setIsOpen(true)} >
              Read More
          </div>
          <ul className={styles.socialLinks}>
            {socials.map((social) => {
              return (
              <li key={social.url}>
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