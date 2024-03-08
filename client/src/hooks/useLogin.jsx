import { useState } from "react";
import { useDispatch } from 'react-redux'
import {setLogin} from '../state/authSlice'


export const useLogin = () => {
    
    const dispatch = useDispatch()
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)


  const login = async (email,password) =>{
    setIsLoading(true)
    setError(null)

    const response = await fetch('/users/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
      
    })

    const data = await response.json()

    if(!response.ok){
      setIsLoading(false)
      setError(data.error)
    }

    if(response.ok){
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      dispatch(setLogin(data))

      setIsLoading(false)
    }

  }

  return {login, isLoading, error}
}
