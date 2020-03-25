const express = require('express');
const path = require('path');
const socketServer = require('socket.io');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socketServer(server);

// test for connection
io.on('connection', (socket) => {
  const { address, port } = socket.request.connection._peername;
  console.log(`User Connected [${address}:${port}]`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  let currentRoom;

  // Join room when 'room' event is emitted
  socket.on('room', (data) => {
    socket.join(data.room, (err) => {
      if (err) console.error(err);
      if (currentRoom) socket.leave(currentRoom);

      currentRoom = data.room;
      console.log(`User ${socket.id} joined room ${data.room}`);
      console.log(io.sockets.adapter.rooms);
    });
  });

  // TODO: Handle leave room event when user switches room

  // handle coding event
  socket.on('coding', (data) => {
    console.log(data);
    socket.broadcast.to(data.room).emit('code sent from server', data);
  });
});

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle requests for client files
// app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Define route handlers
app.get('/secret', (req, res) => {
  res.send('The password is potato');
});

app.post('/register', userController.createUser, (req, res) => {
  return res.status(200).send('Successful add to database');
});

app.post('/login', userController.loginUser, (req, res) => {
  return res.status(200).json('Successful login');
});

// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status).json(errorObj.message);
  }
});
