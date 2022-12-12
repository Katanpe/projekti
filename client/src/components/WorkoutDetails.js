import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react';
import ToggleSwitch from "../components/ToggleSwitch";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const API_URL=process.env.REACT_APP_API_URL;

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  let [lightSwitch, setLightSwitch] = useState(false);
  let [bulb, setBulb] = useState("https://media.geeksforgeeks.org/wp-content/uploads/OFFbulb.jpg")


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(API_URL  + '/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
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
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <div>
        <ToggleSwitch
          id="lightSwitch"
          checked={lightSwitch}
          onChange={onLightSwitctChange}
        />
        <label htmlFor="lightSwitch">Turn lights on/off</label>
      </div>
      <div>
        <img src={bulb} alt="lightbulb"/>
        <p>LightSwitch: {String(lightSwitch)}</p>
      </div>
    </div>
  )
}



export default WorkoutDetails