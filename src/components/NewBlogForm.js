import React, {useState} from 'react'

const NewBlogForm = ({ createBlog }) => {
  
  const [newBlogData, setNewBlogData] = useState({title:'', author:'', url:''})

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      await createBlog(newBlogData)
      setNewBlogData({title:'', author:'', url:''})
    } catch (e) {
      console.log(e)
    }
  }

  return (
      <form onSubmit={handleNewBlog}>  
      <h4>Add a blog</h4>
      <div>
        title
        <input type='text'
        value={newBlogData.title}
        name='title'
        onChange={({target}) => setNewBlogData({...newBlogData, title:target.value})}/>
      </div>
      <div>
        author
        <input type='text'
        value={newBlogData.author}
        name='author'
        onChange={({target}) => setNewBlogData({...newBlogData, author:target.value})}/>
      </div>
      <div>
        url
        <input type='text'
        value={newBlogData.url}
        name='url'
        onChange={({target}) => setNewBlogData({...newBlogData, url:target.value})}/>
      </div>
      <button type='submit'>Submit</button>
    </form>
    )
}

export default NewBlogForm