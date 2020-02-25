import React, { useState } from 'react';
import axios from 'axios';

function Login(props) {
   const [loginForm, setLoginForm] = useState({
       username: '',
       password: ''
   })
   const [error,setError] = useState(false)
  
   const changeHandle = e => {
       e.preventDefault()
       setLoginForm({...loginForm,[e.target.name]:e.target.value})
       console.log(loginForm)
   }
   const submitForm = e => {
       axios.post("https://divercity-test.herokuapp.com/login",loginForm,{
headers:{
    "Content-type":"application/json"
}
       }
      )
      .then(res => {
        console.log(res)
        localStorage.setItem("username",loginForm.username)
        localStorage.setItem("password",loginForm.password)
        localStorage.setItem("token",res.data.token)
        props.history.push("/")
      })
      .catch(err => 
        {
            setError(true)
            console.log(err)
        }
      )
       setLoginForm({
           userName: '',
           password: ''
       })
       e.preventDefault()
       

   }
   return (
       <div className='login'>
           <div className='container'>
               <form onSubmit={submitForm} className='formLogin'>
                   <label htmlFor='userName' className='user'><p>Username:</p></label>
                   <input
                       className='input'
                       id='userName'
                       type='text'
                       name='username'
                       placeholder='Enter Username'
                       required
                       onChange={changeHandle}
                       value={loginForm.username}
                   />
                   <label htmlFor='password' className='pass'><p>Password:</p></label>
                   <input
                       className='input'
                       id='password'
                       type='password'
                       name='password'
                       placeholder='Enter Password'
                       required
                       onChange={changeHandle}
                       value={loginForm.password}
                   />
                   {error ? <p className="error">Username or Password Incorrect</p> : null}
                   <button type='submit' className='loginButton'>Login</button>
               </form>
           </div>
       </div>
   )
}
export default Login;