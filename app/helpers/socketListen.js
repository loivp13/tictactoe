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
      console.log(roomid);
      socket.join(roomid);
      socket.emit("joinRoom", {
        username: socket.username,
        roomid,
      });
      io.to(roomid).emit("userJoin", {
        content: `${socket.username} has joined!`,
      });
    } else {
      socket.join(socket.id);
      socket.emit("createRoom", {
        username: socket.username,
        roomid: socket.id,
      });
    }
    socket.on("submitChatMessage", ({ content, roomid }) => {
      console.log(content);
      io.to(roomid).emit("updateChatRoom", {
        content,
        from: socket.username,
      });
    });
  });
  io.on("disconnect", (socket) => {
    console.log("DISCONNECTED");
  });
};

module.exports = socketListen;
