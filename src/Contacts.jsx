import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import apiEndpoints from './api';
import axios from 'axios'

const Contacts = () => {
  const [contacts, setContacts] = React.useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getContacts() {
      const res = await axios.get(apiEndpoints.getContacts)
      const data = res.data
      console.log(data)
      setContacts(data)
    }

    getContacts()
  }, [])
  return (
    <div>
      <h2>Contact</h2>

      <button onClick={() => navigate('/contacts/add')}>Add contact</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {
            contacts.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/contacts/${item.id}/edit`}>Edit</Link>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div >
  )
}

export default Contacts