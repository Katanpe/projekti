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
          <h1>Lamp Assistant</h1>
        </Link>
        <nav className="options">
          {user && (
            <div>
              <button className="button" onClick={handleTheme}>Toggle Theme</button>
              <span>{user.email}</span>
              <button className="button" onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <button className="button" onClick={handleTheme}>Toggle Theme</button>
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