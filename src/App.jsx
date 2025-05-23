import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import UserDetails from './Components/UserDetails'
import Support from './Components/Support'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/User-details-Bcgame' element={<UserDetails/>}/>
      <Route path='/Support' element={<Support/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/RegisterAdminsss' element={<Register/>}/>

    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
