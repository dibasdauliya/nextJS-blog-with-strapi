import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'

export default function Create() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'html-css',
    slug: ''
  })
  const [isLoading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)

    console.log(JSON.stringify(formData))

    const add = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const addRes = await add.json()

    console.log(addRes)
    setFormData({
      title: '',
      description: '',
      content: '',
      category: 'html-css',
      slug: ''
    })
    setLoading(false)
  }

  function handleChange(e) {
    const name = e.target.name
    setFormData((prev) => {
      return { ...prev, [name]: e.target.value }
    })
  }
  return (
    <>
      <Head>
        <title>Create post</title>
      </Head>

      <style jsx>
        {`
          .form-group > * {
            display: block;
          }

          .form-group {
            margin-bottom: 1em;
          }

          .form-group input,
          .form-group textarea,
          .form-group button,
          .form-group select {
            font-size: 1rem;
            width: 100%;
            font-family: inherit;
            padding: 0.5em;
          }
        `}
      </style>

      <main className='container'>
        <Link href='/'>
          <a>
            <h1>Home</h1>
          </a>
        </Link>
        <h1>Create Post</h1>
        <form>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              name='title'
              id='title'
              required
              placeholder='Enter title'
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='category'>Choose category</label>
            <select
              name='category'
              id='category'
              onChange={(e) => handleChange(e)}
            >
              <option value='html-css'>HTML and CSS</option>
              <option value='javascript'>Javascript </option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='slug'>Slug</label>
            <input
              type='text'
              name='slug'
              id='slug'
              onChange={(e) => handleChange(e)}
              value={formData.slug}
              placeholder='Enter a slug'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <input
              type='text'
              name='description'
              id='description'
              required
              placeholder='Enter description'
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='content'>Content (Markdown is supported)</label>
            <textarea
              rows={5}
              type='text'
              name='content'
              id='content'
              required
              placeholder='Enter content'
              value={formData.content}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button onClick={(e) => handleSubmit(e)}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </main>
    </>
  )
}
