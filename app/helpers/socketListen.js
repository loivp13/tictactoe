const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

let socketListen = function (io) {
  io.use((socket, next) => {
    let user = socket.handshake.auth.user;
    if (!user) {
      return next(new Error("invalid username"));
    }
    socket.username = user;
    next();
  });
  io.on("connection", (socket) => {
    let roomid = socket.handshake.auth.roomid;
    if (roomid) {
      socket.join(roomid);
    } else {
      io.emit("createRoom", { username: socket.username, roomid: socket.id });
    }
  });

  io.on("submitChatMessage", ({ content, roomid }) => {
    console.log(content, roomid);
  });
};

module.exports = socketListen;
