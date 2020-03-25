const Project = require('../models/projectSchema.js');
const projectMiddleware = {};


projectMiddleware.saveDoc = (req, res, next) => {

    // put request
    // find the id
    // update the body

    const { id } = req.body;
    const { bodyEdit } = req.params;
    const project = Project.findOne({id});
    
    if(!project) {
        return res.status(401).send({error: 'This project was not found'})
    } else {
        Project.updateOne({ body: bodyEdit }, { bodyEdit }, (err, result) => {
            if (err) {
                return res.status(418).send('Something went wrong did not update');
            } 
            return res.send(result);
        })
    }
}



projectMiddleware.deleteDoc = (req, res, next) => {

    /* Find the id and delete from there */
    
    const { projectid } = req.params;
    Project.deleteOne({ id: projectid }, (err) => {
        if (err) {
            return res.status(418).send("Unable to delete")
        }

        return res.send("Successfully deleted");
    })

        

}


module.exports = projectMiddleware;