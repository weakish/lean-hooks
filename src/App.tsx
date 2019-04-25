import {useForm} from 'react-hooks-helper'
import React, { useState, useEffect } from 'react'
import AV from 'leancloud-storage'
import './App.css'

interface User {
  [index: string]: string;
  username: string;
  password: string;
  email: string;
}

const App: React.FC = () => {
  const [token, setToken] = useState("")
  const [{username, password, email}, setForm] = useForm<User>({
    username: '',
    password: '',
    email: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    AV.init({
      appId: "3AJTBW5QyGw17hLxNN3njGHW-gzGzoHsz",
      appKey: "P8cKdEvRxusfuR27MuhvFOzr",
    })
  }, [])
  useEffect(() => {
    const fetchToken = async () => {
      if (submitted && token === "") {
        const user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        user.setEmail(email)
        const authenticatedUser = await user.signUp()
        const sessionToken = authenticatedUser.getSessionToken()
        setToken(sessionToken)
      }
    }
    fetchToken()
  }, [submitted, username, password, email, token])
  
  const userProperties = ["username", "password", "email"]
  const inputFields = userProperties.map((p, i) =>
      <div key={p} className="register-form">
        <label htmlFor={p}>{p}</label>
        <input type={p === "username" ? "text" : p}
                value={p === "username" ? username : (p === "password" ? password : email)} id={p} name={p} onChange={setForm} />
      </div>
  )
  const note = <div className="register-form-note">
    <p>All input fields are optional:</p>
    <ul>
      <li>If email is unspecified, we will left it as empty. Thus you cannot receive notifications and recover your account via email.</li>
      <li>If username is unspecified but email is specified, we will use email as username.</li>
      <li>If both username and email are unspecified, we will auto generate an username for you.</li>
      <li>If password is unspecified, we will auto generate a random onetime password.</li>
    </ul>
  </div>
  return (
    <div className="App">
        {inputFields}
        <div className="register-form">
          <input type="submit" value="register" onClick={() => setSubmitted(true)} />
        </div>
      <p>token: {token}</p>
    </div>
  );
}

export default App;
