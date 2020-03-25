// middleware unit testing.

const pgController = require('../controllers/pgController')

console.log(Object.keys(userController));
const db = require('../database/database.js');

describe('pgController', () => {
    beforeAll(() => {
        const mockRequest = (data) => {
            return {
              body: { data: data },
            };
          };
        const mockResponse = () => {
            const res = {};
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn().mockReturnValue(res);
            return res;
          };
    });

    describe('addNewProject', () => {
        it('returns message if project_name already exists', () => {
            const req = mockRequest();
            const res = mockResponse();
            await pgController.addNewProject(req, res);
            expect()
        })
    });
});
