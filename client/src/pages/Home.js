import { useEffect }from 'react'
import { useRoomsContext } from "../hooks/useRoomsContext"
import { useAuthContext } from "../hooks/useAuthContext"


// components
import RoomDetails from '../components/RoomDetails'
import RoomForm from '../components/RoomForm'

const API_URL=process.env.REACT_APP_API_URL;

const Home = () => {
  const {rooms, dispatch} = useRoomsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch(API_URL + '/rooms/', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ROOMS', payload: json})
      }
    }

    if (user) {
      fetchRooms()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="rooms">
        {rooms && rooms.map((room) => (
          <RoomDetails key={room._id} room={room} />
        ))}
      </div>
      <RoomForm />
    </div>
  )
}

export default Home