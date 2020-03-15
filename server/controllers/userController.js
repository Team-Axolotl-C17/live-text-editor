const db = require('../database/database.js');

const userController = {};

// Add user info to database
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next('Missing username or password');
  const queryArr = [username, password];
  const queryStr = 'INSERT INTO users (username,password) VALUES($1, $2)';
  db.query(queryStr, queryArr, (err, data) => {
    console.log(data);
    if (err) {
      return next({
          log: 'An error has occurred in createUser',
          status: 400,
          err: { err },
      });
    } else return next();
  });


};

module.exports = userController;