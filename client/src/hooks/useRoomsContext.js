import { RoomsContext } from '../context/RoomContext'
import { useContext } from 'react'

export const useRoomsContext = () => {
  const context = useContext(RoomsContext)

  if (!context) {
    throw Error('useRoomsContext must be used inside an RoomsContextProvider')
  }

  return context
}