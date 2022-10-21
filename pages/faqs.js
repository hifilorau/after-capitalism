import styles from '../styles/Home.module.scss' 
import React, {useContext} from 'react'
import Image
 from 'next/image'
import BlogHeader from '../components/BlogHeader'
import Footer from '../components/footer'
import Modal from '../components/Modal'
import { ModalContext } from '../components/ModalContext'

const FAQs = () => {
  const context = useContext(ModalContext)
  // <div className={styles.blogWrapper}>
  //   <div className={styles.header}>
  //       <div className={styles.banner}>
  //         <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
  //       </div>
  //      <BlogHeader content={post} />
  //     </div>
 
 return (
  <div>
      {context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
      <div className={styles.header}>
        <div className={styles.banner}>
          <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
        </div>
       <BlogHeader>
        <h3>FAQs</h3>
       <ul>
      <li>
        <p className={styles.question}>
        You say we shouldn’t demonize capitalism, but then you argue that it has led us to the brink of collapse? Please explain. 
        </p>
        <ul>
          <li>Perhaps we can compromise a bit and say capitalism has outlived its usefulness and gone on too long. Demonizing drives people into us vs. them and will slow down progress, so we really want to avoid. 
          </li>
        </ul>
      </li>
      <li>
        <p className={styles.question}>
        Why is After Capitalism necessary? Is it inevitable? 
        </p>
        <ul className={styles.answer}>
          <li>The snarky answer is “look out the window.” Crisis is everywhere. Think of capitalism as our global operating system. It is clearly broken. </li>
          <li>A more thoughtful answer draws on the theory of social change underlying this work -- development. It says that change moves toward greater complexity, choices, and options over time. The view here is that after capitalism is a next logical phase of development. </li>
        </ul>
      </li>
      <li>
        <p className={styles.question}>
        Is the need for After Capitalism the same everywhere?
        </p>
        <ul className={styles.answer}>
          <li>No, the US, for example, is an extreme case of the struggles of late-stage capitalism and its growth imperative driving toward collapse. In other affluent countries, particularly in Northern Europe,  the are furtherer advanced on the path to after capitalism
          </li>
        </ul>
      </li>
      <li>
        <p className={styles.question}>
        These images seem to be very affluent - / western- / Global North – centric. Please explain.
        </p>
        <ul className={styles.answer}>
          <li>Developing countries do not have the same issue of hyper-growth, but suffer from the growth imperative of capitalism nonetheless. Many developing countries have adopted a capitalist model and are simply at an earlier stage of development, but if they continue, they will also likely encounter the hyper-growth challenge. 
          </li>
        </ul>
      </li>
      <li>
        <p className={styles.question}>
        Are the three images of After Capitalism too prescriptive? Isn’t it better to let a thousand flowers bloom?

        </p>
        <ul className={styles.answer}>
          <li>These images are very high level and mean to be guides, north stars, or attractors. They do not contain a specific program, but rather suggest many possible ideas of concepts that would fit with the broad guiding image. There is plenty of room for creativity. 

          </li>
        </ul>
      </li>
      <li>
        <p className={styles.question}>
        What could stand in the way of After Capitalism?
        </p>
        <ul className={styles.answer}>
          <li>There is a big question of whether after capitalism can happen in one country or region or needs to be global to succeed.
          </li>
        </ul>
      </li>
    </ul>
       </BlogHeader>
      </div>    
      <Footer />
  </div>
 )
}

export default FAQs