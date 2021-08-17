import { io } from "socket.io-client";

const socket = io("localhost:8080", { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
export default socket;
