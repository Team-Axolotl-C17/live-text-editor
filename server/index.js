const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const socketServer = require('socket.io');

const authRoute = require('./routes/auth');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let server;
// serve bundle.js in prod for every url
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // app.use('/emails/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });

  app.listen(443);
  server = app.listen(80); // listens on port 3000 -> http://localhost:3000/
} else {
  server = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

// routing
app.use('/auth', authRoute);

// catch all
app.use('*', (req, res, next) => {
  next({
    code: 404,
    message: 'Sorry - this resource cannot be found.',
    log: `User failed request: ${req.method} - ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  // err MUST be in format:
  // { code: status code, message: message to user, log: message to server operator }
  console.log(err.log);
  return res.status(err.code).json(err.message);
});

// START SOCKET.IO
const onlineUsers = {};
let roomsInUse = [];
let finRoom = {};
let roomCode = {};

// test for connection
const io = socketServer(server);
io.on('connection', (socket) => {
  // console.log('Online users: ', onlineUsers);

  // const { address, port } = socket.request.connection._peername;
  console.log(`User Connected [ ${socket.id} ]`);
  onlineUsers[socket.id] = 'defaultUsername';

  socket.on('disconnect', () => {
    console.log('user disconnected');
    updateRooms();
  });

  let username;
  socket.on('username', (un) => {
    username = un;
    onlineUsers[socket.id] = username;
  });
  let currentRoom;

  // Join room when 'room' event is emitted
  socket.on('room', (data) => {
    socket.join(data.room, (err) => {
      if (err) console.error(err);
      if (currentRoom) socket.leave(currentRoom);

      currentRoom = data.room;
      console.log('current rooms code:');
      console.log(roomCode[currentRoom]);

      if (roomCode[currentRoom] === undefined) {
        roomCode[currentRoom] = 'helo';
      }

      io.to(socket.id).emit('code sent from server', roomCode[currentRoom]);

      updateRooms();
    });
  });

  function updateRooms() {
    // declare globally all rooms that have someone using it
    console.log('Rooms:');
    console.log(io.sockets.adapter.rooms);
    roomsInUse = Object.keys(io.sockets.adapter.rooms).filter((key) => {
      return onlineUsers[key] === undefined;
    });

    finRoom = {};
    roomsInUse.forEach((room) => {
      // Get each socket id from room
      const arr = [];
      Object.keys(io.sockets.adapter.rooms[room].sockets).forEach((sid) => {
        // push usernames into an array
        arr.push(onlineUsers[sid]);
      });
      finRoom[room] = arr;
      io.in(room).emit('currentUsers', finRoom[room]);
    });
    console.log('USERS IN ROOMS:');
    console.log(finRoom);

    // update current user in user's room
    // io.emit('currentUsers', finRoom[currentRoom]);

    // send all available rooms to all users
    io.emit('availableRooms', roomsInUse);

    console.log(roomsInUse);
  }

  // TODO: Handle leave room event when user switches room

  // handle coding event
  socket.on('coding', (data) => {
    roomCode[currentRoom] = data;
    // console.log(data);
    socket.broadcast.to(data.room).emit('code sent from server', data);
  });
});
// END SOCKET.IO

module.exports = app;
