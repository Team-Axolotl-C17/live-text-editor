const db = require('../database/database.js');
const bcrypt = require('bcrypt');

const userController = {};

// Add user info to database
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryArr1 = [username];
  const queryString = 'SELECT * FROM users WHERE username = $1'
  // search for any rows in database where username exists
  db.query(queryString, queryArr1, (err, data) => {
    if (err) {
      return next({
          log: 'An error has occurred in createUser1',
          status: 400,
          err: { err },
      });
    } else if (data.rows.length > 0) {
        return next({
          log: 'Username already exists',
          status: 409,
          err: { err },
        });
      } else {
          // hash pasword with bcrypt
          bcrypt.hash(password, 10,
            function(err, hashedPassword) {
              if (err) { 
                next(err);
              } else {
                  console.log('hashedPassword: ', hashedPassword);
                  const queryArr2 = [username, hashedPassword];
                  const queryStr = 'INSERT INTO users (username,password) VALUES($1, $2)';
                  // stores username and hashed password in table in database
                  db.query(queryStr, queryArr2, (err, data) => {
                    if (err) {
                      return next({
                          log: 'An error has occurred in createUser2',
                          status: 400,
                          err: { err },
                      });
                    } else return next();
                  })
                }
            });
        }
  })
};

userController.getUserId = (req, res, next) => {
  const queryStr = `SELECT user_id FROM users WHERE username = '${req.query.username}'`
  db.query(queryStr, (err, data) => {
    if (err) {
      return next({
          log: 'An error has occurred in loginUser',
          status: 400,
          err: { err },
      })
    }
    res.locals.user_id = data.rows[0].user_id
    console.log(res.locals.user_id)
    return next()
  })
}

userController.loginUser = (req, res, next) => {
  const { username, password } = req.body;
  const queryArr = [username];
  const queryStr = 'SELECT * FROM users WHERE username = $1'
  // retrieves rows in table in database where username matches
  db.query(queryStr, queryArr, (err, data) => {
    if (err) {
      return next({
          log: 'An error has occurred in loginUser',
          status: 400,
          err: { err },
      });
    } else {
        if (data.rows.length > 0) {
          // use bcrypt to authenticate password
          bcrypt.compare(password, data.rows[0].password, function(err, same) {
            if (same) {
              return next();
            } else {
                return next({
                  log: 'Email and password does not match',
                  status: 401,
                  err: { err },
                });
              }
          });
          } else {
              return next({
                log: 'Username does not exist',
                status: 406,
                err: { err },
              });
            }
      }
  })
}

module.exports = userController;