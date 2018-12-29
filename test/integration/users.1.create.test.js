const path = '/users';
const tests = require('./providers/create.js');

describe('Events API', () => {
  describe('Creating', () => {
    tests.data.forEach(test => {
      it(test.title, done => {
        chai
          .request(server)
          .post(path)
          // .set("id", callId)
          .send(test.data)
          .end((err, res) => {
            if (err) {
              console.error(err);
            }
            console.log(
              'CODE: ',
              res.status,
              '| CODE expect: ',
              test.expect.code
            );
            // console.log(
            //   'MESSAGE: ',
            //   res.body.message,
            //   '| MESSAGE expect: ',
            //   test.expect.message
            // );
            checkHeaders(res, test.expect.status);
            // res.status.should.be.equal(test.expect.code);
            // res.body.message.should.be.equal(test.expect.message);
            done();
          });
      });
    });
  });
});
