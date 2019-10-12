const chai = require('chai');
const chaiHttp = require('chai-http');
const serverUrl = 'http://127.0.0.1:3200';
const {expect, assert, should} = chai;

const server = require('../src/server');

chai.use(chaiHttp);

describe('basic_routes', function () {
    before(function () {
        // server();
        // runs before all tests in this block
    });

    after(function () {
        server.closeServer();
        // runs after all tests in this block
    });
    it('should response on /second_route', function () {
        chai
            .request(serverUrl)
            .get('/second_route')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.eql({hello:'hello'});
                console.log('second_route res: ', err, res.body);
            })
    });
    it('should return the 404 error message', function () {
        const errorMessage = 'Page Not Found';
        chai
            .request(serverUrl)
            .get('/404')
            // .expect(404)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.message).equal(errorMessage);
                console.log('res: ', err, res.body);
            });
        // .expect(/Page Not Found/, done);
    });
    // describe('#indexOf()', function() {
    //     it('should return -1 when the value is not present', function() {
    //         assert.equal([1, 2, 3].indexOf(4), -1);
    //     });
    // });
});

// //..
// chai
// .request(server)
// .get(`${PATH}`)
// ..
//
// // ...
// should.not.exist(err);
// //...
// // BAD
// router.get("/api/v1/articles", async ctx => {
//     try {
//         const articles = await knex("articles").select();
//         ctx.body = {
//             data: articles
//         };
//     } catch (error) {
//         console.error(error);
//     }
// });
// // GOD
// router.get("/api/v1/articles", articlesController.index);
// res.status.should.eql(200);

// ...
// res.type.should.eql("application/json");
//...
// BAD
// router.get("/api/v1/articles", async ctx => {
//     try {
//         const articles = await knex("articles").select();
//         ctx.body = {
//             data: articles
//         };
//     } catch (error) {
//         console.error(error);
//     }
// });
