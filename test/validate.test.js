'use strict';

// Dependencies
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var validate = require('../utils/validate.js');
var accountCtrl = require('../controllers/accountCtrl.js');

// Chai setup
chai.should();
chai.use(sinonChai);

describe('validate', function() {
  var account = {
    name: 'twitter',
    username: '@phillies',
    password: 'tweet123',
    masterPassword: 'master123'
  };

  describe('#create', function() {
    afterEach(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call accountCtrl.create once', sinon.test(function() {
      var create = this.spy(accountCtrl, 'create');
      validate('create', account, true);
      create.should.have.been.calledOnce;
    }));

    it('should call accountCtrl.create with all account props and master password', sinon.test(function() {
      var create = this.spy(accountCtrl, 'create');
      validate('create', account, true);
      create.should.have.been.calledWithExactly({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    }));
  });

  describe('#read', function() {
    before(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call accountCtrl.read once', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      validate('read', account, true);
      read.should.have.been.calledOnce;
    }));

    it('should call accountCtrl.read with account name and master password', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      validate('read', account, true);
      read.should.have.been.calledWithExactly(account.name, account.masterPassword);
    }));
  });

  describe('#update', function() {
    before(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call accountCtrl.update once', sinon.test(function() {
      var update = this.spy(accountCtrl, 'update');
      validate('update', account, true);
      update.should.have.been.calledOnce;
    }));

    it('should call accountCtrl.update with all account props and master password', sinon.test(function() {
      var update = this.spy(accountCtrl, 'update');
      validate('update', account, true);
      update.should.have.been.calledWithExactly(account.name, account.username, account.password, account.masterPassword);
    }));
  });

  describe('#delete', function() {
    beforeEach(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    it('should call accountCtrl.delete once', sinon.test(function() {
      var destroy = this.spy(accountCtrl, 'delete');
      validate('delete', account, true);
      destroy.should.have.been.calledOnce;
    }));

    it('should call accountCtrl.delete with account name and master password', sinon.test(function() {
      var destroy = this.spy(accountCtrl, 'delete');
      validate('delete', account, true);
      destroy.should.have.been.calledWithExactly(account.name, account.masterPassword);
    }));
  });

});
