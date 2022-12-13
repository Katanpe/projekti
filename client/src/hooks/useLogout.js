import { useAuthContext } from './useAuthContext'
import { useRoomsContext } from './useRoomsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchRooms } = useRoomsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchRooms({ type: 'SET_ROOMS', payload: null })
  }

  return { logout }
}