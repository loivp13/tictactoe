export default function checkIfLogin(username, roomid, history) {
  if (!username || !roomid) {
    history.push("/");
  }
}
