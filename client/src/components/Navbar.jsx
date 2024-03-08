import { Link } from "react-router-dom"
import {useLogout} from '../hooks/useLogout.jsx'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {logout} = useLogout()
  const user = useSelector(state => state.auth.user)

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className="container">
            <Link to="/">
            <h1>CRUD</h1>
            </Link>
        </div>
        <nav>
        <div className={user ? 'user-info' : ''}>
      {user && (
        <>
          <span className="user-email">{user.email}</span>
          <button className="logout-button" onClick={handleClick}>
            Log Out
          </button>
        </>
      )}
    </div>
         {!user && ( <div>
          <Link to="/login"> Login </Link>
          <Link to="/signup"> Signup </Link>
          </div>
         )}
        </nav>
    </header>
  )
}

export default Navbar