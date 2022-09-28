import React, {useState} from 'react'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { testimonials } from '../lib/testimonials'
import Image from 'next/image'

const Testimonials = () => {

  return (
    <div className={styles.testimonials}>
      {/* <h2>Read an Excerpt</h2> */}
      <ul className={styles.testimonialUl}>
      {testimonials && testimonials.map((item) =>{
        return (
          <li key={item.name}>
            <div className={styles.testTopGrid}>
              <div className={styles.testImgWrap}>
                <img src={item.imgUrl}/>
              </div>
              <div>
                <h4>{item.name}</h4>
                <h5>{item.title}</h5>
                <h5>{item.work}</h5>
              </div>
            </div>
            <p>{item.review}</p>
            <div className={styles.quoteMark}>
              <Image src="/quote.png" width={99} height={66}/>
            </div>
          </li>
        )
      })}
     </ul>
    </div>
    )
}

export default Testimonials