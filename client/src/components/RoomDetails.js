import { useRoomsContext as useRoomsContext } from '../hooks/useRoomsContext'
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

  const onLightSwitctChange = (checked) => {
    setLightSwitch(checked);
    if (!checked) {
      setBulb("https://media.geeksforgeeks.org/wp-content/uploads/OFFbulb.jpg")
    } else {
      setBulb("https://media.geeksforgeeks.org/wp-content/uploads/ONbulb.jpg")
    }
  };

  return (
    <div className="room-details">
      <h4>{room.title}</h4>
      <p><strong>Load (kg): </strong>{room.load}</p>
      <p><strong>Reps: </strong>{room.reps}</p>
      <p>{formatDistanceToNow(new Date(room.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <div>
        <ToggleSwitch
          id="lightSwitch"
          checked={lightSwitch}
          onChange={onLightSwitctChange}
        />
        <label htmlFor="lightSwitch"><p><b>Turn lights on/off</b></p></label>
      </div>
      <div>
        <img src={bulb} alt="lightbulb"/>
        <p>LightSwitch: {String(lightSwitch)}</p>
      </div>
    </div>
  )
}



export default RoomDetails