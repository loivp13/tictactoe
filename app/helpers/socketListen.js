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
    //add roomid to socket
    let roomid = socket.handshake.auth.roomid;

    //join room if has roomid
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
      //create room is has no id
    } else {
      socket.join(socket.id);
      socket.emit("createRoom", {
        username: socket.username,
        roomid: socket.id,
      });
    }

    //player submitted message
    socket.on("submitChatMessage", ({ content, roomid }) => {
      console.log(content);
      io.to(roomid).emit("updateChatRoom", {
        content,
        from: socket.username,
      });
    });

    //player started the game
    socket.on("gameStart", ({ roomid }) => {
      console.log("game start");
      io.to(roomid).emit("startGame");
    });
  });
  io.on("disconnect", (socket) => {
    console.log("disconnected");
  });
};

module.exports = socketListen;
