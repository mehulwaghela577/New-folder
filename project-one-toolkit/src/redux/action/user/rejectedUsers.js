import socket from "../../../Socket"
import { rejectedUsersReducer } from "../../slices/userSlice"

const rejectedUsers = () => {
    return (dispatch) => {
        socket.emit('user|post|get', {
            "details": {
                "page": 1,
                "limit": 10,
                "search": "",
                "status": 2,
                "type": ""
            }
        })
        socket.on('user|post|get', (response) => {
            dispatch(rejectedUsersReducer(response.data.items))
        })
    }
}
export default rejectedUsers