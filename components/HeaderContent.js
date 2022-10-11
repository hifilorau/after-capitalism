import styles from '../styles/Home.module.scss'
import Image from 'next/image'
import Home from '../pages'
import Link from 'next/link'
import Author from './Author'

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
      <Author />
    </div>
  )
}

export default HeaderContent


 