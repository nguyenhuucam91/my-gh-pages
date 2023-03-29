import React from 'react'
import apiEndpoints from './api'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddContact = () => {
  const navigate = useNavigate()
  const [form, setForm] = React.useState({})
  const [selectedFile, setSelectedFile] = React.useState({})

  const handleChange = (e) => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", selectedFile)
    try {
      const res = await axios.post(apiEndpoints.uploadImage, formData)
      const imageUrl = res.data.Url

      await axios.post(apiEndpoints.storeContact, { ...form, image: imageUrl })
      alert("Created successfully")
      navigate('/contacts')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} method="POST">
      <div>
        <img src="" alt='' />
        <input type="file" name="uploaded" onChange={handleUpload} />
      </div>
      <div>
        <label>Name</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
      </div>

      <div>
        <label>Phone</label>
        <input type="number" name="phone" onChange={handleChange} />
      </div>

      <button type="submit">Add</button>
    </form>
  )
}

export default AddContact