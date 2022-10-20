// import { getSinglePost } from "../../lib/functions";
import styles from '../../styles/Home.module.scss'
// import Subscribe from "../../components/Subscribe";
import BlogHeader from "../../components/BlogHeader";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Footer from '../../components/footer';

const PostPage = ({post, events}) => {
  console.log('I GOT THE POST', post)
  return (
    <>
    <Head>
      <title>Imagining After Capitalism: Monitoring</title>
   </Head>
   
    <div className={styles.blogWrapper}>
    <div className={styles.header}>

        <div className={styles.banner}>
        <Link href="/" passHref={true}>
          <a className={styles.bannerLink}>
           <Image src="/ben.png" layout="responsive" width={1440} height={580}/>
          </a>
      </Link>
        </div>
       
       <BlogHeader content={post}>
          <h3>{post.title.rendered}</h3>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />   
       </BlogHeader>
      </div>
       {/* <div className={styles.ucWrapper}>
        <h3>Upcoming Events</h3>
        <ul>
        {events.map((event)=>{

          return (
            <li key={event.id}>
              <div className={styles.ucDate}>{event.fields.dateReadable}</div>
              <div className={styles.ucName}>{event.fields.name}</div>
              {event.fields.ticket_link && <a href={event.fields.ticket_link} target="_blank" rel="noreferrer"><div className={styles.ucTicket}>Tickets</div></a>}
            </li>
          )
        })}
        </ul>
      </div> */}
      {/* <h1>{post.title}</h1>
      <img src={post.feature_image} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
      {/* <Subscribe /> */}
    </div>
    <Footer />
    </>
  );
};

export default PostPage;

// export async function getStaticPaths() {
//   const posts = await getPosts();

//   // Get the paths we want to create based on posts
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }));

//   // "fallback: false" gives us a 404 if post not found
//   return { paths, fallback: false };
// }

// Pass the page slug to "getSinglePost()" function
// Which then passes it to "posts.read()" to query the GhostContentAPI
export async function getServerSideProps(context) {
  // const [posts, setPosts] = useState([]);
  const slug = context.params.slug
  const response = await fetch(`http://api.imaginingaftercapitalism.com/wp-json/wp/v2/posts?slug=${slug}`);
  if(!response.ok) {
      // oups! something went wrong
      return;
  }

  const post = await response.json();


  return {
    props: {
    post: post[0],
    }
    // revalidate: 1,
  };
}