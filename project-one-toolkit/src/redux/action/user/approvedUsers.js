import socket from "../../../Socket"
import { approvedUsersReducer } from "../../slices/userSlice"

const approvedUsers = () => {
    return (dispatch) => {
        socket.emit('user|post|get', {
            "details": {
                "page": 1,
                "limit": 10,
                "search": "",
                "status": 1,
                "type": ""
            }
        })
        socket.on('user|post|get', (response) => {
            dispatch(approvedUsersReducer(response.data.items))
        })
    }
}
export default approvedUsers