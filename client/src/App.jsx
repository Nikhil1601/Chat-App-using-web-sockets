import { useState } from 'react';
import Register from './Register';
import axios from 'axios';
import {UserContextProvider} from './UserContext';
function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://localhost:4040"
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
    <Register />
    </UserContextProvider>
  )
}

export default App
