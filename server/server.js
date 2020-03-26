const express = require('express');
const path = require('path');
const app = express();
const userController = require('./middleware/userController');const PORT = 3000;



// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*  MongoDB Connection Logic */
const mongoose = require('mongoose');
const db = require('./config/mongoKey.js').mongoURI;

mongoose
  .connect(db)
  .then(() => console.log('We are now connected to the MongoDB'))
  .catch(err => console.log('We have failed to connect to the MongoDB'))



/* Webpack/ Webpack Compiler */

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath, stats: { colors: true }
}));
app.use(require('webpack-hot-middleware')(compiler));


/* Endpoint logic / Routes */

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


// Route handlers that uses postgres
app.get('/secret', function(req, res) {
  res.send('The password is potato');
});
app.post('/register', userController.createUser, (req, res) => {
  return res.status(200).send('Successful add to database');
});
app.post('/login', userController.loginUser,  (req, res) => {
  return res.status(200).json('Successful login');
});


// MongoDB routes / middleware



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

// Listens and checks if the server is running or not

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/* Socket Logic */
const socket = require('socket.io');
const io = socket(server);



const lastBroadcastedCode = {}; // maintains object of lastBroadcastedCode, to serve to a client newly joining the room

// test for connection
io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Join data.room when 'room' event is emitted
  socket.on('join room', clientMsg => {
    socket.join(clientMsg.room);
    if (lastBroadcastedCode[clientMsg.room] !== undefined) {
      io.to(socket.id).emit(
        'code sent from server', 
        { code :lastBroadcastedCode[clientMsg.room] }
      );
    }
 // send the last broadcasted code for the room
    console.log(`User ${socket.id} joined room "${clientMsg.room}"`);
    console.log(`lastBroadcastedCode: ${lastBroadcastedCode[clientMsg.room]}`)
  });

  // TODO: Handle leave room event when user switches room
  socket.on('leave room', clientMsg => {
    socket.leave(clientMsg.room, err =>{
      if (err) console.error(err);
    });
    console.log(`User ${socket.id} left room "${clientMsg.room}"`)
  })

  socket.on('client edited code', clientMsg => {
    socket.broadcast.to(clientMsg.room).emit('code sent from server', { code: clientMsg.newCode });
    // store last broadcasted code 
    lastBroadcastedCode[clientMsg.room] = clientMsg.newCode;
    console.log('code data being broadcasted:', { code : clientMsg.newCode });
  });
});
