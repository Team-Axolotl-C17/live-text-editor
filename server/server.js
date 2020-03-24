const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();
const userController = require('./controllers/userController');
const PORT = 3000;
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = socket(server);

// test for connection
io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Join data.room when 'room' event is emitted
  socket.on('join room', data => {
    socket.join(data.room, err => {
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${data.room}`);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on('leave room', data => {
    socket.join(data.room, err =>{
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} joined room ${data.room}`)
    
  })

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
// app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
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
      message: { err: 'An error occurred' }
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status).json(errorObj.message);
  }
});