import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import Navbar from './Navbar';
import axios from 'axios';
import Table from './Table';

axios.defaults.withCredentials = true

function App() {
  return <Router>
    <Navbar />
    <Routes> 
      <Route path='/' element={<Table />} />
      <Route path='signup' element={<Register />} />
      <Route path='signin' element={<Login />} />
    </Routes>
  </Router>
}

export default App;
