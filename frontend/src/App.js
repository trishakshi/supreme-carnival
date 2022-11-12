import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Navbar'
import { Axios } from 'axios';
import Register from './Register';

// Axios.defaults.withCredentials = true

function App() {
  return  <Register/>
}

export default App;
