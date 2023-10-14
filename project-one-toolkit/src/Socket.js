import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_SOCKET_KEY)
socket.on("connect", () => {
    console.log("connect");
})
socket.on("disconnect", () => {
    console.log("disconnect");
})

export default socket;