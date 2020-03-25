const request = require('supertest');
const server = 'http://localhost:3000';

const mockDocument = {
    username: 'TDBank',
    docName: 'bank docs',
    docText: 'document info'
}

describe('Route integration', () => {
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
            })
        })
    })
})

