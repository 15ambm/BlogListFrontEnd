import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogData, setNewBlogData] = useState({title:'', author:'', url:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create(newBlogData)
      console.log(response)
      setBlogs(blogs.concat(response))
      setNotification({data:'Added new Blog', color:'blue'})
      setTimeout(() => {
        setNotification('')
      }, 3000 )
    } catch (e) {
      
    }
  }

  return (
    <div>
      <h2>blogs</h2>

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
          <NewBlogForm handleNewBlog={handleNewBlog} newBlogData={newBlogData} setNewBlogData={setNewBlogData} />
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  )
}

export default App