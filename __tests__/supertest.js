const request = require('supertest');
const server = 'http://localhost:3000';

const mockDocument = {
    username: 'TDBank',
    docName: 'bank docs',
    docText: 'document info'
}

describe('Route integration for saving documents', () => {
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

    describe('/retrieve', () => {
        describe('GET', () => {
            it('responds with 200 status and application/json content type', () => {
                return request(server)
                    .get('/retrieve')
                    .send({"username": "Taylor"})
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then( res => {
                        expect(res.body).toEqual([
                            { doc_name: 'Golden', doc_text: 'Retriever' },
                            { doc_name: 'golden', doc_text: 'retriever' },
                            { doc_name: 'golden', doc_text: 'retriever' },
                            { doc_name: 'golden', doc_text: 'retriever' }
                          ])
                    })
                    
            })
        })
    })
})

// const mockUser = {
//     username: "MockUser", 
//     password: "hello"
// }


describe('Route integration for userController', () => {
    describe('/register',() => {
        describe('POST', () => {
            it('adds the user to the database', () => {
                return request(server)
                    .post('/register')
                    // .send(mockUser)
                    .expect('Content-Type', /application\/json/)
                    .expect(200)
                    .then( res => {
                        expect(res.body).toEqual('Successful add to database')
                    })
            })
        })
    })
})