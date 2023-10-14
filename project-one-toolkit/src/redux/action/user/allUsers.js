import socket from "../../../Socket"
import { allUsersReducer } from "../../slices/userSlice"

const allUsers = () => {
    return (dispatch) => {
        socket.emit('user|post|get', {
            "details": {
                "page": 1,
                "limit": 10,
                "search": "",
                "status": "",
                "type": ""
            }
        })
        socket.on('user|post|get', (response) => {
            dispatch(allUsersReducer(response.data.items))
        })
    }
}
export default allUsers