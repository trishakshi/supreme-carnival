import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Table = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hashTag, setHashTag] = useState('')
    const [image, setImage] = useState('')

    const upload = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("title", title)
        formData.append("image", image)
        formData.append("description", description)
        formData.append("hashTag", hashTag)

        await axios.post(`http://localhost:8080/media/upload`, formData)
    }
    return (
        <div style={{ width: "300px", margin: " 50px auto" }}>

            <form onSubmit={upload} encType='multipart/form-data'>
                <div class="mb-3">
                    <label for="image" class="form-label">Choose File</label>
                    <input filename="image" type="file" class="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" class="form-control" id="title" />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" class="form-control" id="description" />
                </div>
                <div class="mb-3">
                    <label for="hashtag" class="form-label">Hashtag</label>
                    <input value={hashTag} onChange={(e) => setHashTag(e.target.value)} type="text" class="form-control" id="hashtag" />
                </div>
                <button type="submit" class="btn btn-primary">Upload</button>
            </form>
        </div>
    )
}

export default Table