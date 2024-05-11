import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import Registerride from './Registerride'
import Bookride from './Bookride'
import PayementPage from './Payementpage'
import Profile from './Profile'
import YourRides from './Yourrides'
function App()
{
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/Signup' element={<Signup />}></Route>
      <Route path='/Home' element={<Home />}></Route>
      <Route path='/Registerride' element={<Registerride />}></Route>
      <Route path='/Bookride' element={<Bookride />}></Route>
      <Route path='/Payementpage' element={<PayementPage />}></Route>
      <Route path='/Profile' element={<Profile />}></Route>
      <Route path='/Yourrides' element={<YourRides />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App