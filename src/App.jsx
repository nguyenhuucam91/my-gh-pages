import './App.css';

import { Route, Routes } from 'react-router-dom';

import AddContact from './AddContact';
import Contacts from './Contacts';
import EditContact from './EditContact';

function App() {
  return (
    <Routes>
      <Route path='/contacts' element={<Contacts />}></Route>
      <Route path='/contacts/add' element={<AddContact />}></Route>
      <Route path='/contacts/:id/edit' element={<EditContact />}></Route>
    </Routes>
  );
}

export default App;
