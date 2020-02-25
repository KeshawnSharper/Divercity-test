import React, { useState } from "react";
import axios from "axios";
import "./jobs.css"
export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name:""
  });

  const handleChange = e => {
   
    e.preventDefault()
setForm({...form,[e.target.name]:e.target.value})
   console.log(form)
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(form);
    axios.post("https://divercity-test.herokuapp.com/register",form,{
      headers:{
          "Content-type":"application/json"
      }})
.then(res => console.log(res.data))
.catch(err => console.log(err))
    setForm({ username: "", password: ""});

  };

  return (
    <div className="signup">
      <form className="container" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name"><p>Name:</p></label>
        <input
          id="=name"
          name="name"
          required
          onChange={handleChange}
          placeholder="name"
          value={form.name}
        />
        <label htmlFor="username"><p>Username:</p></label>
        <input
          id="username"
          name="username"
          required
          onChange={handleChange}
          placeholder="Username"
          value={form.username}
        />
        <label htmlFor="password"><p>Password:</p></label>
        <input
          id="password"
          type="password"
          minLength="8"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          value={form.password}
          required
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
