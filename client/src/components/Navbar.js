import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTheme } from '../hooks/useTheme'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const { toggleTheme } = useTheme()

  const handleClick = () => {
    logout()
  }

  const handleTheme = () => {
    toggleTheme()
  }

  return (

      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
          <button onClick={handleTheme}>Toggle Theme</button>
          <nav>
            {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

  )
}

export default Navbar