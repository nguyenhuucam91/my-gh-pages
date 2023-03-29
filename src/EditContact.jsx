import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import apiEndpoints from './api'
import axios from 'axios'
import format from 'string-template'

const EditContact = () => {
  const { id } = useParams()
  const [contact, setContact] = useState({})
  const [form, setForm] = useState({})
  const [fileUploaded, setFileUploaded] = React.useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getContact(id) {
      const res = await axios.get(format(apiEndpoints.showContactById, { id }))
      const data = res.data
      setContact(data)
    }

    getContact(id)
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(format(apiEndpoints.updateContact, { id }), { ...form })
      alert(JSON.stringify(res.data))
      navigate('/contacts')
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (e) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileUpload = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    try {
      const res = await axios.post(apiEndpoints.uploadImage, formData)
      setFileUploaded(res.data.Url)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Edit contact</h2>
      <div>
        <img src={fileUploaded || contact.image || ''} alt='' />
        <input type="file" name="uploaded" onChange={handleFileUpload} />
      </div>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={form.name || contact.name || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" name="email" value={form.email || contact.email || ''} onChange={handleChange} />
      </div>

      <div>
        <label>Phone</label>
        <input type="number" name="phone" value={form.phone || contact.phone || ''} onChange={handleChange} />
      </div>

      <button type="submit">Update</button>
    </form>
  )
}

export default EditContact