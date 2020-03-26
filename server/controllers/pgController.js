const db = require('../database/database.js');

const pgController = {};

pgController.addNewProject = (req, res, next) => {
    const { user_id, project_name } = req.body
    const queryArr = [project_name]
    const queryStr = 'SELECT * FROM projects WHERE project_name = $1'
    db.query(queryStr, queryArr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in addNewProject1',
                status: 400,
                err: { err }
            });
        } else if (data.rows.length > 0) {
            return next({
              log: 'Username already exists',
              status: 409,
              err: { err },
            });
        } else {
            
        }
    });
    return next();  
}