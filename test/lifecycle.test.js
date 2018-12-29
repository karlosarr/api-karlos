var sails = require('sails');
global.expect200 = () => {
  return {
    status: 200,
    code: 'OK',
    message: 'Operation is successfully executed'
  };
};
global.expect400 = (message = false) => {
  return {
    status: 400,
    code: 'E_BAD_REQUEST',
    message: message || 'The request cannot be fulfilled due to bad syntax'
  };
};
global.expect403 = (message = false) => {
  return {
    status: 403,
    code: 'E_FORBIDDEN',
    message: message || 'User not authorized to perform the operation'
  };
};
global.expect404 = (message = false) => {
  return {
    status: 404,
    code: 'E_NOT_FOUND',
    message:
      message ||
      'The requested resource could not be found but may be available again in the future'
  };
};
beforeEach(() => {
  global.chai = require('chai');
  chai.should();
  global.chaiHttp = require('chai-http');
  global.sinon = require('sinon');
  global.sinonChai = require('sinon-chai');
  global.mock = require('mock-require');
  chai.use(chaiHttp);
  chai.use(sinonChai);
  global.expect = require('chai').expect;
  global.server = 'http://localhost:1337';
  global.checkHeaders = function(res, statusCode) {
    res.should.have.status(statusCode);
    res.should.have.header('content-type', 'application/json; charset=utf-8');
  };
});
// Before running any tests...
before(function(done) {
  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift(
    {
      // Your sails app's configuration files will be loaded automatically,
      // but you can also specify any other special overrides here for testing purposes.

      // For example, we might want to skip the Grunt hook,
      // and disable all logs except errors and warnings:
      hooks: { grunt: false },
      log: { level: 'warn' }
    },
    err => {
      if (err) {
        return done(err);
      }

      // here you can load fixtures, etc.
      // (for example, you might want to create some records in the database)

      return done();
    }
  );
});

// After all tests have finished...
after(done => {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);
});
