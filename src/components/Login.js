import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";     // Not working

function Login() {
    const navigate  = useNavigate()

    const [userdata, setUserData] = useState({ email: "", password: "" })

    const host = "http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: userdata.email, password: userdata.password })
        });

        const user = await response.json();

        if (response.status !== 400) {
            // console.log("Login Successfull")
            // console.log(user.authtoken)
            // localStorage.setItem("authtoken", user.authtoken)
            localStorage.setItem("authtoken", user.authtoken)

            return navigate("/");
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

export default Login