import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Table = () => {
    const [userData, setUserData] = useState([])
    const [loggedUser, setLoggedUser] = useState()

    useEffect(() => {
        getUserData()
        getLoggedUser()
    }, []);

    const getUserData = async () => {
        const res = await axios.get(`http://localhost:8080/auth/users`)
        setUserData(res.data)
    }

    const getLoggedUser = async () => {
        const res = await axios.get(`http://localhost:8080/auth/loggedUser`)
        setLoggedUser(res.data)
    }

    const approve = async() => {
        const status = {
            status: "approved"
        }

        await axios.put(`http://localhost:8080/auth/users/${loggedUser._id}`, status)
    }
    const reject = async() => {
        const status = {
            status: "rejected"
        }

        await axios.put(`http://localhost:8080/auth/users/${loggedUser._id}`, status)
    }
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {userData.map((data, index) => {
                    return <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.email}</td>
                        <td>{data.status}</td>
                        <td>
                            <button onClick={approve} type="submit" class="btn btn-success">Approve</button>
                            <button onClick={reject} type="submit" class="btn btn btn-danger">Reject</button>
                        </td>
                    </tr>
                })}

            </tbody>
        </table>
    )
}

export default Table