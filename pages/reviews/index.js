import React, {useContext} from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Footer from '../../components/footer'
import Modal from '../../components/Modal'
import { ModalContext } from '../../components/ModalContext'
import PageLayout from '../../components/PageLayout'

export default function Reviews({reviews, error}) {
	const context = useContext(ModalContext)

	return (
		<div>
			{context.isOpen && <Modal setIsOpen={context.setIsOpen}/>}
			<Head>
				<title>Reviews - Imagining After Capitalism</title>
				<meta name="description" content="Reviews of Andy Hines' book Imagining After Capitalism" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.header}>
				<PageLayout>
					<h3>Reviews</h3>
					<div className={styles.reviewsList}>
						{reviews && reviews.map((review) => (
							<div key={review.id} className={styles.reviewItem}>
								<h2 dangerouslySetInnerHTML={{ __html: review.title.rendered }}></h2>
								<div dangerouslySetInnerHTML={{ __html: review.content.rendered }}></div>
								<div className={styles.reviewDate}>
									{new Date(review.date).toLocaleDateString()}
								</div>
							</div>
						))}
					</div>
				</PageLayout>
			</div>
			<Footer />
		</div>

	)
}

export async function getServerSideProps(context) {
	let error = [];

	const reviewsRes = await fetch('https://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts?categories=7');
	if(!reviewsRes.ok) {
		error.push(reviewsRes.error)
		console.log('ERROR')  
	}

	const reviews = await reviewsRes.json()
	
	return {
		props: {reviews, error}, // will be passed to the page component as props
	}
}