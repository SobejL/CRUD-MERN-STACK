import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setLogout } from '../state/authSlice';
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(data));

      // Update the auth context
      dispatch(setLogout(data));

      setIsLoading(false);
      
      // Navigate to the home page
      navigate("/");

    }
  };

  return { signup, isLoading, error };
};
