// middleware unit testing.
const fs = require('fs')
const path = require('path')
const projectMiddleware = require(path.resolve(__dirname, '../controllers/projectMiddleware.js'))

//const Project = require('../models/projectSchema.js');
//const db = require('../database/database.js');
const mockRequest = (data) => {
    return {
        body: { data: data },
    };
};
const mockResponse = () => {
    const res = {};
    res.locals = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('test', () => {
    it('returns 4', () => {
        expect(projectMiddleware.test()).toBe(4)
    })
})

// describe('addNewProject', () => {
//     it('returns warning if project_name already exists', async () => {
//         const req = mockRequest();
//         const res = mockResponse();
//         await projectMiddleware.addNewProject(req, res);
//         expect(res.status).toHaveBeenCalledWith(409);
//         expect(res.locals.message).toEqual({'message': 'project_name already exists'});
//     });

//     // it('', () => {

//     // });
// });
