import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }

        await axios.post(`http://localhost:8080/auth/login`, data)
        navigate('/')
    }
  return (
    <div style={{ width: "300px", margin: " 50px auto" }}>
    <form onSubmit={login}>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
</div>
  )
}

export default Login