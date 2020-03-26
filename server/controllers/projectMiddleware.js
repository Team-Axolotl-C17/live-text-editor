const Project = require('../database/mongoDb.js');
const db = require('../database/database.js');

const projectMiddleware = {};


/* addNewProject */
projectMiddleware.addProjectToSql = (req, res, next) => {
    // expects:
        // req.body.user_id
        // req.body.project_name
    const { user_id, project_name } = req.body
    const queryArr = [project_name]
    const queryStr = 'SELECT * FROM projects WHERE project_name = $1'
    db.query(queryStr, queryArr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in addNewProject1 dbquery',
                status: 400,
                err: { err }
            });
        } 
        else if (data.rows.length > 0) {
            return next({
                log: 'project_name already exists',
                status: 409,
                err: { err }
            });
        } 
        else {
            // send to user project_name and project_id
            const queryStr = 'INSERT INTO projects (project_name) VALUES ($1) RETURNING project_id'
            const queryArr = [project_name]
            db.query(queryStr, queryArr, (err, data) => {
                res.locals.project_id = data.rows[0].project_id;
                res.locals.project_name = project_name;
                res.locals.user_id = user_id;
                return next();
            });
        }
    });
}

projectMiddleware.linkUsertoProject = (req, res, next) => {
    // expects:
        // res.locals.project_id
        // res.locals.user_id
    if (res.locals.user_id === undefined ) { res.locals.user_id = req.body.user_id }
    if (res.locals.project_id === undefined ) { res.locals.project_id = req.body.project_id }
    const queryArr = [ res.locals.project_id, res.locals.user_id ]
    const queryStr = `INSERT INTO user_project (project_id, user_id) VALUES ($1, $2)`;
    db.query(queryStr, queryArr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in linkUsertoProject dbquery',
                status: 400,
                err: { err }
            });
        } 
        return next();
    })
}

projectMiddleware.addProjectToMongo = (req, res, next) => {
    // expects:
        // res.locals.project_id
        // res.locals.project_name
        // res.locals.user_id
    const project = {
        project_name: res.locals.project_name,
        project_id: res.locals.project_id,
        body: ' '
    }
    Project.create(project, (err, res) => {
        if (err) {
            return next({
                log: 'An error has occurred in addProjectToMongo',
                status: 400,
                err: { err }
            })
        }
        return next();
    });
}
/* saveExistingProject */
projectMiddleware.updateProjectInMongo = (req, res, next) => {
    // expects:
        // req.body.project_name
        // req.body.body
    console.log('updateProjectInMongo')
    const { project_name, body } = req.body;
    Project.updateOne({ project_name : project_name }, { body : body }, (err, res) => {
        if (err) {
            return next({
                log: 'An error has occurred in updateProjectInMongo dbquery',
                status: 400,
                err: { err }
            })
        }
        console.log(res);
        return next();
     })
}

/* deleteExistingProject */
projectMiddleware.unlinkUsersFromProject = (req, res, next) => {
    // expects: 
        // req.body.project_id
    const queryStr = `DELETE FROM user_project WHERE project_id = ${req.body.project_id}`
    db.query(queryStr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in unlinkUsersFromProject dbquery',
                status: 400,
                err: { err }
            });
        } 
        return next();
    });
}

projectMiddleware.deleteProjectInSql = (req, res, next) => {
    // expects: 
        // req.body.project_id
        // req.body.user_id (for user-specific updates in the future)
    const queryStr = `DELETE FROM projects WHERE project_id = ${req.body.project_id}`
    db.query(queryStr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in deleteProjectInSql dbquery',
                status: 400,
                err: { err }
            });
        } 
        return next();
    });
}

projectMiddleware.deleteProjectInMongo = (req, res, next) => {
    // expects:
        // req.body.project_id
    Project.deleteOne({ project_id: req.body.project_id }, (err, res) => {
        if (err) {
            return next({
                log: 'An error has occurred in deleteProjectInMongo dbquery',
                status: 400,
                err: { err }
            });
        }
        return next();
    })
}

/* loadExistingProject */
projectMiddleware.loadExistingProject = (req, res, next) => {
  // expects:
    // req.body.project_id
  Project.findOne({ project_id : req.body.project_id }, (err, result) => {
      if (err) {
          return next({
            log: 'An error has occurred in loadExistingProject dbquery',
            status: 400,
            err: { err }
          });
      }
      res.locals.existingProjectCode = result;
      return next();
  })
}

/* getProjects */
projectMiddleware.getProjects = (req, res, next) => {
    // expects:
        // req.query.username
    const queryStr = `
    SELECT up.project_id, p.project_name 
        FROM user_project up 
        INNER JOIN projects p ON up.project_id = p.project_id 
        INNER JOIN users u ON up.user_id = u.user_id 
        WHERE u.username = '${req.query.username}'
    `
    db.query(queryStr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in addNewProject1 dbquery',
                status: 400,
                err: { err }
            });
        } 
        res.locals.projects = data.rows
        console.log(data.rows);
        return next();
    })
}

/* getAllProjects */
projectMiddleware.getAllProjects = (req, res, next) => {
    // expects:
        // req.query.username
    const queryStr = `
    SELECT up.project_id, p.project_name 
        FROM user_project up 
        INNER JOIN projects p ON up.project_id = p.project_id 
        INNER JOIN users u ON up.user_id = u.user_id 
        WHERE u.username != '${req.query.username}'
    `
    db.query(queryStr, (err, data) => {
        if (err) {
            return next({
                log: 'An error has occurred in addNewProject1 dbquery',
                status: 400,
                err: { err }
            });
        } 
        res.locals.projects = data.rows
        console.log(data.rows);
        return next();
    })
}

module.exports = projectMiddleware;