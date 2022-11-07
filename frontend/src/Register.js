import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const register = async () => {
        const data = {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            password: password
        }

        await axios.post(`http://localhost:8080/auth/register`, data)
        navigate('/')
    }

    return (
        <div style={{ width: "300px", margin: " 50px auto" }}>
            <form onSubmit={register}>
                <div class="mb-3">
                    <label for="exampleInputName" class="form-label">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPhone" class="form-label">Phone Number</label>
                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" class="form-control" id="exampleInputPhone" aria-describedby="emailHelp" />
                </div>
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

export default Register