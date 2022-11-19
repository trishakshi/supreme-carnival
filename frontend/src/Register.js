import React, { useState } from "react";
import image from "./images/samsung-memory-DI2SR-IxkCg-unsplash.jpg";
import axios from 'axios'

const Register = () => {
  const [memberType, setMemberType] = useState("")
  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [instaHandle, setInstaHandle] = useState("")
  const [ytHandle, setYtHandle] = useState("")
  const [fbHandle, setFbHandle] = useState("")
  const [storeName, setStoreName] = useState("")
  const [address, setAddress] = useState("")
  const [gst, setGST] = useState()

const register = async(e) => {
  e.preventDefault()
  const data = {
    memberType,
    phoneNumber,
    passwordHash: password,
    email,
    name,
    instaHandle,
    ytHandle,
    fbHandle,
    storeName,
    address, gst
  }
await axios.post('http://localhost:8080/auth/register', data)
}

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <img src={image} class="img-fluid" alt="..." />
        </div>
        <div class="col">
          <form>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="influencer"
                onChange={(e) => {
                  setMemberType(e.target.value)
                }}
              />
              <label class="form-check-label" for="exampleRadios1">
                Influencer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="retailer"
                onChange={(e) => {
                  setMemberType(e.target.value)
                }}
              />
              <label class="form-check-label" for="exampleRadios1">
                Retailer
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="user"
                onChange={(e) => {
                  setMemberType(e.target.value)
                }}
              />
              <label class="form-check-label" for="exampleRadios1">
                User
              </label>
            </div>
            <input placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
            <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
            <input placeholder="Insta Handle" onChange={(e) => setInstaHandle(e.target.value)} value={instaHandle} />
            <input placeholder="YT Handle" onChange={(e) => setYtHandle(e.target.value)} value={ytHandle} />
            <input placeholder="FB Handle" onChange={(e) => setFbHandle(e.target.value)} value={fbHandle} />
            <input placeholder="Store Name" onChange={(e) => setStoreName(e.target.value)} value={storeName} />
            <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={address} />
            <input placeholder="GST" onChange={(e) => setGST(e.target.value)} value={gst} />
            <button onClick={register}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
