const Router = require('express').Router();
const userController = require('../controllers/userController');

Router.get('/test', (req, res) => {
  return res.status(200).json('/auth/test reached');
});

Router.post('/register', userController.createUser, (req, res) => {
  return res.status(200).send('Successful add to database');
});

Router.post('/login', userController.loginUser, (req, res) => {
  return res.status(200).json({ username: res.locals.username });
});

module.exports = Router;
