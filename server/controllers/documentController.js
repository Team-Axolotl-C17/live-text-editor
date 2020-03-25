const db = require('../database/database.js');

const documentController = {}

documentController.saveDoc = (req, res, next) => {
    const { username, docName, docText } = req.body;
    const queryArr1 = [username,docName, docText];
    const queryString = "INSERT into documents (doc_name, doc_text, doc_id) VALUES ($2, $3, (SELECT _id FROM users WHERE username = $1))"
    console.log('DOC CONTROLLER SAVE DOC FIRED')
    db.query(queryString, queryArr1, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in createUser',
                status: 400,
                err: { err },
            });
          } else {
            return next() 
          }  
    })
} 
documentController.retrieveDoc = (req, res, next) => {
    const { username } = req.body;
    const selectArr = [username]
    const selectorString = "SELECT documents.doc_name, documents.doc_text FROM users INNER JOIN documents ON users._id = documents.doc_id WHERE users.username = $1"
    db.query(selectorString, selectArr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in retrieveDoc',
                status: 400,
                err: { err },
            });
          } else {
              res.locals.documents = data.rows;
              return next()
          }
    })
}

 

module.exports = documentController;