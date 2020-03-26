const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const userController = require('./controllers/userController');
const PORT = 3000;
const documentController = require('./controllers/documentController');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

// test for connection
io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Join room when 'room' event is emitted
  socket.on('room', data => {
    socket.join(data.room, err => {
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${data.room}`);
    console.log(io.sockets.adapter.rooms);
  });

  // TODO: Handle leave room event when user switches room

  // handle coding event
  socket.on('coding', data => {
    console.log(data);
    socket.broadcast.to(data.room).emit('code sent from server', data);
  });
});

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle requests for client files
//app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// serve build files in production
// if (process.env.NODE_ENV === 'production') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../index.html'));
//   });
// }

// Define route handlers
app.get('/secret', function(req, res) {
  res.send('The password is potato');
});
app.post('/register', userController.createUser, (req, res) => {
  return res.status(200).json('Successful add to database');
});
app.post('/login', userController.loginUser, (req, res) => {
  return res.status(200).json('Successful login');
});

// deleting a user from the database 
app.delete('/deleteuser', userController.deleteUser, (req, res) => {
  return res.status(200).json('Successfully deleted the user')
})

// saving documents for the logged in user 
app.post('/save', documentController.saveDoc, (req, res) => {
  return res.status(200).json('Successfully saved')
})

// retrieving saved docs in the front-end
app.get('/retrieve', documentController.retrieveDoc, (req, res) => {
  return res.status(200).json(res.locals.documents)
})

// deleting a specific document from the database
app.delete('/deletedoc', documentController.deleteDoc, (req, res) => {
  return res.status(200).json('Document successfully deleted')
})


// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' }
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status).json(errorObj.message);
  }
});