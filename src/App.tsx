import {useForm} from 'react-hooks-helper'
import React from 'react';
import './App.css';

interface User {
  [index: string]: string;
  username: string;
  password: string;
  email: string;
}

const App: React.FC = () => {
  const [{username, password, email}, setForm] = useForm<User>({
    username: '',
    password: '',
    email: '',
  })
  
  const userProperties = ["username", "password", "email"]
  const inputFields = userProperties.map((p, i) =>
      <div className="signup-form">
        <label htmlFor={p}>{p}: </label>
        <input type={p === "username" ? "text" : p}
                value={p === "username" ? username : (p === "password" ? password : email)} id={p} name={p} required onChange={setForm} />
      </div>
  )
  
  return (
    <div className="App">
      {inputFields}
    </div>
  );
}

export default App;
