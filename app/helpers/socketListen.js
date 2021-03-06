const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

let socketListen = function (io, redis) {
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
        username: socket.username,
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

    //update guest with host's username
    socket.on("updateGuest", ({ hostname, roomid }) => {
      io.to(roomid).emit("updatingGuest", {
        hostname,
      });
    });
    //player started the game
    socket.on("gameStart", ({ roomid }) => {
      console.log("game start");
      io.to(roomid).emit("startGame");
    });
    //player submitted a bet
    socket.on("playerBet", ({ roomid, betAmount }) => {
      //look if players have started to bet
      console.log(roomid, betAmount);
      redis.get(roomid, (err, result) => {
        //if error
        if (err) {
          console.log(err);

          //determine who goes first
        } else {
          if (result) {
            let { firstPlayer, firstPlayerAmount } = JSON.parse(result);
            if (firstPlayerAmount > betAmount) {
              io.to(roomid).emit("betEnded", {
                betAmount: firstPlayerAmount,
                username: firstPlayer,
              });
            } else if (firstPlayerAmount < betAmount) {
              io.to(roomid).emit("betEnded", {
                betAmount,
                username: socket.username,
              });
            } else {
              //HANDLE TIE
            }
            redis.del(roomid);
          } else {
            let stringify = JSON.stringify({
              firstPlayer: socket.username,
              firstPlayerAmount: betAmount,
            });
            redis.set(roomid, stringify);
          }
        }
      });
    });

    socket.on("gameEnded", ({ roomid, cloneBoard, winner }) => {
      io.to(roomid).emit("gameOver", {
        cloneBoard,
        username: winner,
      });
      io.to(roomid).emit("updateGameBoard", {
        username: winner,
      });
    });
    socket.on("updateBoard", ({ roomid, cloneBoard, rounds }) => {
      console.log(rounds);
      if (rounds < 2) {
        io.to(roomid).emit("nextPlayersTurn", {
          username: socket.username,
          cloneBoard,
          rounds,
        });
      } else {
        io.to(roomid).emit("roundEnded", { cloneBoard, rounds });
      }
    });
    socket.on("restartGame", ({ roomid }) => {
      io.to(roomid).emit("restartingGame");
    });

    socket.on("userLoggedOut", ({ permissionLvl, roomid, username }) => {
      if (permissionLvl === "host") {
        io.to(roomid).emit("loggingGuestOut", {
          content: "Host has ended the session",
        });
      } else if (permissionLvl === "guest") {
        io.to(roomid).emit("updatingHost", {
          content: `${username} has logged out`,
        });
      }
    });
  });

  io.on("disconnect", (socket) => {
    console.log("disconnected");
  });
};

module.exports = socketListen;
