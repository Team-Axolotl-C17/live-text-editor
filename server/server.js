const express = require('express');
const path = require('path');
const app = express();
const userController = require('./controllers/userController');
const projectMiddleware = require('./controllers/projectMiddleware');
const PORT = 3000;
const Project = require('./database/mongoDb.js');

// Handle parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


// Route handlers for user login
app.get('/secret', (req, res) => {
  return res.send('The password is potato');
});

app.post('/register', userController.createUser, (req, res) => {
  return res.status(200).send('Successful add to database');
});

app.post('/login', userController.loginUser,  (req, res) => {
  return res.status(200).json('Successful login');
});


// Route handlers for interacting with projects
app.get('/getProjects',
  // expects:
      // req.query.username
  projectMiddleware.getProjects,
  (req, res) => {
    return res.status(200).json(res.locals.projects)
  }
)

app.get('/getAllProjects',
  // expects:
      // req.query.username
  projectMiddleware.getAllProjects,
  (req, res) => {
    return res.status(200).json(res.locals.projects)
  }
)

app.get('/getUserId',
  // expects:
    // req.query.username
  userController.getUserId,
  (req, res) => {
    return res.status(200).json({ user_id: res.locals.user_id })
  }
)

app.post('/addNewProject', 
  // expects:
    // req.body.user_id
    // req.body.project_name
  projectMiddleware.addProjectToSql,
  projectMiddleware.linkUsertoProject,
  projectMiddleware.addProjectToMongo,
  (req, res) => {
    return res.status(200).json({project_id: res.locals.project_id, project_name: res.locals.project_name})
})

app.post('/saveExistingProject',
  // expects:
    // req.body.project_name
    // req.body.body
  projectMiddleware.updateProjectInMongo,
  (req, res) => {
    console.log('saved ', req.body.project_name)
    return res.status(200).send('success')
  }
)

app.delete('/deleteExistingProject',
  // expects: 
      // req.body.project_id
      // req.body.user_id (for user-specific updates in the future) 
  projectMiddleware.unlinkUsersFromProject,
  projectMiddleware.deleteProjectInSql,
  projectMiddleware.deleteProjectInMongo,
  (req, res) => {
    return res.status(200).send('success')
  }
)

app.get('/loadExistingProject',
  // expects:
    // req.body.project_id
  projectMiddleware.loadExistingProject,
  (req, res) => {
    return res.status(200).json(res.locals.existingProjectCode) 
  }
)

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
  // expects:
    // clientMsg.room [project_name]
  socket.on('join room', clientMsg => {
    socket.join(clientMsg.room);
    // if no one in the room, broadcast the file from db to the room
    if (lastBroadcastedCode[clientMsg.room] === undefined) {
      Project.findOne({ project_name : clientMsg.room }, (err, result) => {
        io.to(socket.id).emit('code sent from server',
          { code: result.body }
        )
      })
    }
     // if anyone in the room, send the last broadcasted code for the room
    if (lastBroadcastedCode[clientMsg.room] !== undefined) {
      io.to(socket.id).emit('code sent from server', 
        { code :lastBroadcastedCode[clientMsg.room] }
      );
    }
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

  // braodcast client edited code
  socket.on('client edited code', clientMsg => {
    socket.broadcast.to(clientMsg.room).emit('code sent from server', { code: clientMsg.newCode });
    // store last broadcasted code 
    lastBroadcastedCode[clientMsg.room] = clientMsg.newCode;
    console.log('code data being broadcasted:', { code : clientMsg.newCode });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
