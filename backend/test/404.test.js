const chai = require('chai');
const chaiHttp = require('chai-http');
const serverUrl = 'http://127.0.0.1:3200';
const {expect, assert, should} = chai;

let server = null;
chai.use(chaiHttp);

describe('404', function () {
    // before(() => {
    //     server = require('../src/server');
    // });
    // after(() => {
    //     server.closeServer();
    // });
    // it('should return the 404 error message', function () {
    //     const errorMessage = 'Page Not Found';
    //     chai
    //         .request(serverUrl)
    //         .get('/404')
    //         // .expect(404)
    //         .end((err, res) => {
    //             expect(res).to.have.status(404);
    //             expect(res.body.message).equal(errorMessage);
    //             console.log('res: ', err, res.body);
    //         });
    //     // .expect(/Page Not Found/, done);
    // });
});
