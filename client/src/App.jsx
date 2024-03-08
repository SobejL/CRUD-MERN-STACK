import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setLogin } from './state/authSlice'
import PostUpdateForm from './components/PostUpdateForm'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
    useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
        dispatch(setLogin(user))

    }
    console.log('AuthContext state', user)
},[])

  return (
      <div className="App">
      <BrowserRouter>
      <Navbar />
      <div className='pages'>
  
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path='/login' element={!user ? <Login/> : <Navigate to="/" />} />
      <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
      <Route path='/posts/:id'element={user ? <PostUpdateForm /> : <Navigate to="/" />} />

      <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />

    </Routes>
  
      </div>
      </BrowserRouter>
  
    </div>
  )
}

export default App
