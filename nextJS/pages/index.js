import Head from 'next/head'
import Link from 'next/link'
import { Footer } from '../components/footer'
import styles from '../styles/Home.module.css'

export default function Home(props) {
  const { htmlCatRes, jsCatRes } = props

  return (
    <div className='container'>
      <Head>
        <title>My Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to My Blog!</h1>

        <p className={styles.description}>
          <Link href='/create'>
            <a className={styles.button}>Create a Post</a>
          </Link>
        </p>

        {/* category one */}
        <div className={styles.catCard}>
          <h2>HTML and CSS Category</h2>

          {htmlCatRes?.map(({ title, description, id, slug }) => (
            <Link href={`/${slug}`} key={id}>
              <a className={styles.card}>
                <h2>{title}</h2>
                <p>{description}</p>
              </a>
            </Link>
          ))}
        </div>

        {/* category two */}
        <div className={styles.catCard}>
          <h2>JS Category</h2>
          {jsCatRes?.map(({ title, description, id, slug }) => (
            <Link href={`/${slug}`} key={id}>
              <a className={styles.card}>
                <h2>{title}</h2>
                <p>{description}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const htmlCat = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?category=html-css`
  )
  const htmlCatRes = await htmlCat.json()

  const jsCat = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?category=javascript`
  )
  const jsCatRes = await jsCat.json()

  return {
    props: { htmlCatRes, jsCatRes },
    revalidate: 10 //will regenerate page when request comes at every 10 seconds
  }
}
