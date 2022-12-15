import { useRoomsContext} from '../hooks/useRoomsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react';
import ToggleSwitch from "../components/ToggleSwitch";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const RoomDetails = ({ room }) => {
  const { dispatch } = useRoomsContext()
  const { user } = useAuthContext()
  let [lightSwitch, setLightSwitch] = useState(false);
  let [bulb, setBulb] = useState("https://media.geeksforgeeks.org/wp-content/uploads/OFFbulb.jpg")
  //const [lights, setLights] = useState([])


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(API_URL  + '/rooms/' + room._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ROOM', payload: json})
    }
  }

  const onLightSwitchChange = (checked) => {
    setLightSwitch(checked);
    if (!checked) {
      setBulb("https://media.geeksforgeeks.org/wp-content/uploads/OFFbulb.jpg")
    } else {
      setBulb("https://media.geeksforgeeks.org/wp-content/uploads/ONbulb.jpg")
    }
  };

  const RenderLights = (props) => {
    const arrayLights = []
    for (let i=0; i<room.load; i++) {
        arrayLights.push(<ToggleSwitch
          id={i.toString()}
          checked={lightSwitch}
          onChange={onLightSwitchChange}
        />)
    }

    return(
      <>
        {arrayLights.map(light => 
          <>
            <div>
              {light}
              <label className="instructions" htmlFor={light.id}>Turn lights on/off</label>
              <img src={bulb} alt="lightbulb"/>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <div className="room-details">
      <h4>{room.title}</h4>
      <p><strong>Number of lamps: </strong>{room.load}</p>
      <p>{formatDistanceToNow(new Date(room.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <p>Turn all lights on/off: </p>
      <ToggleSwitch
          id="lightSwitchGlobal"
          checked={lightSwitch}
          onChange={onLightSwitchChange}
        />
      <div className="lamps">
        {RenderLights(room)}
      </div>
    </div>
  )
}



export default RoomDetails
