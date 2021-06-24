import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

export default function Post({ finalData }) {
  const { title, author, category, content, created_at } = finalData
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <style>
        {`
        .article * {
            font-size: 18px;
        }

        .flow > * + * {
            margin-top: 1em;
        }

        .flow-sm > * + * {
            margin-top: 0.5em;
        }

        .header h1 {
            font-size: 3rem;
            margin-bottom: 0.3em;
        }

        .author {
            display: flex;
            gap: 1em;
        }
          `}
      </style>

      <div className='container'>
        <article className='flow article'>
          <header className='header'>
            <h1>{title}</h1>
            <div className='author'>
              <span>By {author?.username}</span>
              <span>{new Date(created_at).toLocaleDateString()}</span>
              <span>{category || 404}</span>
            </div>
          </header>
          <main className='flow-sm'>
            <ReactMarkdown>{content}</ReactMarkdown>
          </main>
        </article>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const { post } = params

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?slug=${post}`
  )
  const resData = await data.json()

  const finalData = resData[0]

  return {
    props: { finalData },
    revalidate: 10 //will regenerate page when request comes at every 10 seconds
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts`)
  const posts = await res.json()

  const paths = posts?.map((post) => ({
    params: { post: post.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}
