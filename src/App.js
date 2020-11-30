import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('loggedUser')
    if(userData){
      setUser(JSON.parse(userData))
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


  const loginForm = (
    <form onSubmit={handleLogin}>  
    <div>
      <h4>Please log in</h4>
      username
      <input type='text'
      value={username}
      name='Username'
      onChange={({target}) => setUsername(target.value)}/>
    </div>
    <div>
      password
      <input type='password'
      value={password}
      name='Password'
      onChange={({target}) => setPassword(target.value)}/>
    </div>
    <button type='submit'>Login</button>
  </form>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification data={notification.data} color={notification.color}/>
      {user === null ?
        loginForm :
        <div>
          <p>{user.username} is logged in <button onClick={handleLogout}>Logout</button> </p>
          {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }




    </div>
  )
}

export default App