import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function SignUp() {

  const navigate = useNavigate()

  const [userdata, setUserData] = useState({ username: "", email: "", password: "" })

  const host = "http://localhost:5000"
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: userdata.username, email: userdata.email, password: userdata.password })
    });

    const user = await response.json();

    if (response.status !== 400) {
      console.log("user created Successfully")
      // localStorage.setItem("authtoken", user.authtoken)
      localStorage.setItem("authtoken", user.authtoken)

      return navigate("/login");
    }
    else {
      // alert(user.error)
      console.log("enter correct data")
    }
  }

  const onchange = (e) => {
    setUserData({ ...userdata, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="username" className="form-control" id="username" value={userdata.username} name='username' aria-describedby="usernameHelp" onChange={onchange} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={userdata.email} name='email' aria-describedby="emailHelp" onChange={onchange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={userdata.password} name='password' onChange={onchange} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default SignUp
