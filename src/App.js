import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({data:null})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if(a.likes < b.likes) return 1
        if(a.likes > b.likes) return -1
        else return 0
      })
      setBlogs( blogs )
    }
    )  
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('loggedUser')
    if(userData){
      const user = JSON.parse(userData)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      if(user){
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
      }
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setNotification({data:'Login Successful', color:'green'})
      setTimeout(() => {
        setNotification('')
      }, 3000 )
    } catch (e) {
      setNotification({data:'Invalid Login Information', color:'red'})
      setTimeout(() => {
        setNotification('')
      }, 3000 )
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    console.log("hello")
    setNotification({data:'Successfully Logged Out', color:'green'})
      setTimeout(() => {
        setNotification('')
    }, 3000 )
  }

  const handleNewBlog = async (newBlogData) => {
    try {
      blogFormRef.current.toggleVisibility()
      const response = await blogService.create(newBlogData)
      setBlogs(blogs.concat(response))
      setNotification({data:'Added new Blog', color:'blue'})
      setTimeout(() => {
        setNotification('')
      }, 3000 )
    } catch (e) {
      console.log(e)
    }
  }

  const handleNewLike = async (blogData) => {
    const updatedBlogData = {
      ...blogData,
      likes: blogData.likes + 1,
      user:blogData.user.id
    }

    const response = await blogService.update(updatedBlogData, blogData.id)
    let updatedBlogs = []
    for(let i = 0; i < blogs.length; i++) {
      if (blogs[i].id  !== response.data.id) updatedBlogs.push(blogs[i])
      else updatedBlogs.push(response.data)
    }
    setBlogs(updatedBlogs)
  }

  const handleDeleteBlog = async (blogData) => {
    const result = window.confirm('Are you sure you want to delete this blog')
    if (!result) return
    try { 
      const blogID = blogData.id
      console.log(blogData)
      await blogService.remove(blogID)
      let updatedBlogs = []
      for(let i = 0; i < blogs.length; i++) {
        if (blogs[i].id  !== blogID) updatedBlogs.push(blogs[i])
      }
      setBlogs(updatedBlogs)
      setNotification({data:'Successfully Delelted Blog', color:'blue'})
      setTimeout(() => {
        setNotification('')
      }, 4000 )
    }
    catch(e) {
      setNotification({data:'You do not have permission to delete that blog', color:'red'})
      setTimeout(() => {
        setNotification('')
      }, 4000 )
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification data={notification.data} color={notification.color}/>
      {user === null ?
        <LoginForm handleLogin={handleLogin} 
        username={username} 
        setUsername={setUsername} 
        password={password}
        setPassword={setPassword}  
        /> :
        <div>
          <p>{user.username} is logged in <button onClick={handleLogout}>Logout</button> </p>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <NewBlogForm createBlog={handleNewBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleNewLike} deleteBlog={handleDeleteBlog}/>
          )}
        </div>
      }

    </div>
  )
}

export default App