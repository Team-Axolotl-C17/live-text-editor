const request = require('supertest');
const server = 'http://localhost:3000';

const mockUser = {
    username: "MockUser", 
    password: "hello"
}

const mockDocument = {
    username: 'MockUser',
    docName: 'testDocName',
    docText: 'testDocText',
}

let mockDocID;

describe('Route integration', () => {
    //get static file
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })
        })
    })
    //Save user to DB
    describe('/register',() => {
        describe('POST', () => {
            it('adds the user to the database', () => {
                return request(server)
                    .post('/register')
                    .send(mockUser)
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then( res => {
                        expect(res.body).toEqual('Successful add to database')
                    })
            })
        })
    })
    //save a document for user
    describe('/save', () => {
        describe('POST', () => {
            it('responds with 200 status and application/json content type', () => {
                return request(server)
                    .post('/save')
                    .send(mockDocument)
                    .expect('Content-Type', /application\/json/)
                    .expect(200)   
                    .then ( res => {
                        expect(res.body).toEqual("Successfully saved")
                    })
            })
        })
    })
    //retive document
    describe('/retrieve', () => {
        describe('GET', () => {
            it('responds with 200 status and application/json content type', () => {
                return request(server)
                    .get('/retrieve')
                    .send({"username": "MockUser"})
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then(res => {
                        mockDocID = res.body[0]._id
                        console.log(res.body[0]._id)
                        expect(Array.isArray(res.body)).toEqual(true)
                    })
                    
            })
        })
    })
    //delete document
    describe('/deletedoc', () => {
        describe('DELETE', () => {
            it('deletes document from the database', () => {
                return request(server)
                    .delete('/deletedoc')
                    .send({'id': mockDocID})
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then (res => {
                        expect(res.body).toEqual("Document successfully deleted")
                    })
            })
        })
    })
    //delete user
    describe('/deleteuser', () => {
        describe('DELETE', () => {
            it('deletes user from the database', () => {
                return request(server)
                    .delete('/deleteuser')
                    .send({'username': 'MockUser'})
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then (res => {
                        expect(res.body).toEqual("Successfully deleted the user")
                    })
            })
        })
    })
    
})


