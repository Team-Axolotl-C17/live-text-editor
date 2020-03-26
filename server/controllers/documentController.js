const db = require('../database/database.js');

const documentController = {}

// check the user's ID and save a new document in the database that has a doc_id that matches the user's _id
documentController.saveDoc = (req, res, next) => {
    const { username, docName, docText } = req.body;
    const queryArr1 = [username,docName, docText];
    const queryString = "INSERT into documents (doc_name, doc_text, doc_id) VALUES ($2, $3, (SELECT _id FROM users WHERE username = $1))"
    // console.log('DOC CONTROLLER SAVE DOC FIRED')
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

// check the user's username, and return to the client doc_name and doc_text of all their saved documents in the database 
documentController.retrieveDoc = (req, res, next) => {
    const { username } = req.body;
    const selectArr = [username]
    const selectorString = "SELECT documents.doc_name, documents.doc_text, documents._id FROM users INNER JOIN documents ON users._id = documents.doc_id WHERE users.username = $1"
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

documentController.deleteDoc = (req, res, next) => {
    const { id } = req.body
    const requestArr = [id]
    const deleteString = 'DELETE FROM documents WHERE _id = $1'
    db.query(deleteString, requestArr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in deleteDoc',
                status: 400,
                err: { err },
            });
          } else {
              return next()
          }
    })
}
 

module.exports = documentController;