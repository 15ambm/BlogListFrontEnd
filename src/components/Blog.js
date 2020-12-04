import React, {useState} from 'react'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    padding: 10,
    width: "40%",
    margin: 10
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }
  
  
  return (
  <div style={blogStyle}>
    {visible ? 
      <div>
          <div>Title: {blog.title} <button onClick={toggleVisible}>Hide</button> </div> 
          <div>Author: {blog.author}</div>
          <div>Likes: {blog.likes} <button onClick={() => handleLike(blog)}>Like</button></div>
          <div>URL: {blog.url}</div>
          <button onClick={() => deleteBlog(blog)}>Remove</button>
      </div> :
    <div>
        {blog.title} {" "}
        <button onClick={toggleVisible}> View</button></div>
    }

  </div>
)}

export default Blog
