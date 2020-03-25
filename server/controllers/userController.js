const bcrypt = require('bcrypt');
const db = require('../database/database.js');

const userController = {};

// Add user info to database
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryArr1 = [username];
  const queryString = 'SELECT * FROM users WHERE username = $1';
  // search for any rows in database where username exists
  db.query(queryString, queryArr1, (err, data) => {
    if (err) {
      return next({
        log: 'An error has occurred in createUser',
        status: 400,
        err: { err },
      });
    }
    if (data.rows.length > 0) {
      return next({
        log: 'Username already exists',
        status: 409,
        err: { err },
      });
    }
    // hash pasword with bcrypt
    bcrypt.hash(password, 10, (berr, hashedPassword) => {
      if (berr) {
        return next({
          log: 'Error when hashing password while creatin user.',
          status: 409,
          err: { berr },
        });
      }
      console.log('hashedPassword: ', hashedPassword);
      const queryArr2 = [username, hashedPassword];
      const queryStr = 'INSERT INTO users (username,password) VALUES($1, $2)';
      // stores username and hashed password in table in database
      db.query(queryStr, queryArr2, (qerr) => {
        if (qerr) {
          return next({
            log: 'An error has occurred in createUser',
            status: 400,
            err: { qerr },
          });
        }
        return next();
      });
    });
  });
};

userController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryArr = [username];
  const queryStr = 'SELECT * FROM users WHERE username = $1';
  // retrieves rows in table in database where username matches
  db.query(queryStr, queryArr, (err, data) => {
    if (err) {
      return next({
        log: 'An error has occurred in loginUser',
        status: 400,
        err: { err },
      });
    }
    if (data.rows.length > 0) {
      // use bcrypt to authenticate password
      bcrypt.compare(password, data.rows[0].password, (berr, same) => {
        if (same) {
          res.locals.username = username;
          return next();
        }
        return next({
          log: 'Email and password does not match',
          status: 401,
          err: { berr },
        });
      });
    } else {
      return next({
        log: 'Username does not exist',
        status: 406,
        err: { err },
      });
    }
  });
};

module.exports = userController;
