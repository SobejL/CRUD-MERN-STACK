import { useDispatch } from 'react-redux'
import {setLogout} from '../state/authSlice'
import { getPosts } from '../state/postsSlice'

export const useLogout = () => {


    const dispatch = useDispatch()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch(setLogout())
        
        dispatch(getPosts(null))
        
    }

    return {logout}

}