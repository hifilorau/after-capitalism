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

const HeaderContent = ({setIsOpen}) => {
  return (
    <div className={styles.headerContent}>
      <div className={`${styles.excerpt}`}>
        <p><i>Imagining After Capitalism</i> is the culmination of a decade-long exploration of what comes next after capitalism. It leverages my previous work in developing foresight methodologies, which are featured in two previous books: Teaching about the Future and Thinking about the Future (2nd edition), both with Peter Bishop.  It also leverages my work in identify long-term values shifts – which are pivotal to After Capitalism  -- that are highlighted in  ConsumerShift: How Changing Values Are Reshaping the Consumer Landscape.
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
       
        <p>One of the first books I read about the future was Frederick Polak’s masterpiece “The Image of the Future” in which he laid out the need for societies to have positive guiding images of the future. This work inspirited me to get into professional futures work. I got the Master’s Degree in Foresight and launched into a career as a professional futurist doing work on an incredible array topics, but always with that nagging thought about the need to developed positive images of the long-term future.
        </p>
        <p>
        The seed planted by Polak’s “The Image of the Future,” about the need for positive narratives about the future flowered about ten years ago when the After capitalism topic came up frequently in graduate classes I was teaching. The leading advocate was Graduate Assistant Christopher Manfredi, who brought tremendous energy and enthusiasm that provoked rich classroom discussions. This interest led us to devote our annual Spring Gathering in 2012 to After Capitalism. At about that time I was transitioning into the full-time role as head of the Foresight program. While that transition took up a lot of time and energy, After Capitalism became my principal research interest in my “free time.”
        </p>
        <p><Link href={`/why-i-wrote-it/`}>
          <a style={{color: 'red', fontStyle: 'italic'}}>
            Read more about why I wrote it.  
          </a>
        </Link>
        </p>
      </div>
      <Author setIsOpen={setIsOpen}/>
    </div>
  )
}

export default HeaderContent


 