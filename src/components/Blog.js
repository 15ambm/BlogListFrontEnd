import React, {useState} from 'react'

const Blog = ({ blog }) => {
  
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
          <div>Likes: {blog.likes} <button>Like</button></div>
          <div>URL: {blog.url}</div>

      </div> :
    <div>
        {blog.title} {" "}
        <button onClick={toggleVisible}> View</button></div>
    }

  </div>
)}

export default Blog
