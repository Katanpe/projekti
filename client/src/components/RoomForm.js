import { useState } from "react"
import { useRoomsContext } from "../hooks/useRoomsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const API_URL=process.env.REACT_APP_API_URL;

const RoomForm = () => {
  const { dispatch } = useRoomsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const room = {title, load}

    const response = await fetch(API_URL + '/rooms/', {
      method: 'POST',
      body: JSON.stringify(room),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_ROOM', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Room</h3>

      <label>Room Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Lamppujen lukumäärä:</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <button>Add Room</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default RoomForm