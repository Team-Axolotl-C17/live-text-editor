const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

// test for connection
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // handle coding event
  socket.on('coding', data => {
    console.log(data);
    io.to(data.room).emit('code sent', data);
  });
});

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle requests for client files
app.use(express.static(path.resolve(__dirname, '../client')));

// serve build files in production
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}
