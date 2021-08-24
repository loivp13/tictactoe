export const clearLocalStorage = () => {
  localStorage.setItem("playersOnline", 0);
  localStorage.setItem("permissionLvl", "");
  localStorage.setItem("username", "");
  localStorage.setItem("roomid", "");
};
