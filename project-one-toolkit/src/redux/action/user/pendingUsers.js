import socket from '../../../Socket'
import { pendingUserReducer } from '../../slices/userSlice'


const pendingUsers = () => {
    return (dispatch) => {
        socket.emit('user|post|get', {
            "details": {
                "page": 1,
                "limit": 10,
                "search": "",
                "status": 0,
                "type": ""
            }
        })
        socket.on('user|post|get', (response) => {
            dispatch(pendingUserReducer(response.data.items,))
        })
    }
}
export default pendingUsers
