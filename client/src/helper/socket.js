import { io } from "socket.io-client";
import { clearLocalStorage } from "./clearLocalStorage";

const socket = io("localhost:8080", { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.on("disconnect", () => {
  console.log("client disconnect");
  clearLocalStorage();
});
export default socket;
