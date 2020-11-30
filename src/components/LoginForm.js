import React from 'react'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => 
    (
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


export default LoginForm
