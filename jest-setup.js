module.exports = async () => {
    // global.testServer = await require('./server/server');
    // global.mongoDb = await require('./database/mongoDb');
    // global.postgres = await require('./database/database');
}

// async triggered once before all test suites
// ex) server connection; db connections
// gets Jest's globalConfig obj as parameter
// global variables declared in globalSetup can only be read in globalTeardown