import { io } from "socket.io-client";

const socket = io("localhost:8080", { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});
socket.on("disconnect", () => {
  let playersCount = localStorage.getItem("playersOnline");
  localStorage.setItem("playersOnline", --playersCount);
  localStorage.setItem("permissionLvl", "");
});
export default socket;
