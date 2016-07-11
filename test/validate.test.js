'use strict';

// Dependencies
var sinon = require('sinon');
var validate = require('../utils/validate.js');
var accountCtrl = require('../controllers/accountCtrl.js');

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
      sinon.assert.calledOnce(create);
    }));

    it('should call accountCtrl.create with all account props and master password', sinon.test(function() {
      var create = this.spy(accountCtrl, 'create');
      validate('create', account, true);
      create.calledWith({
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
      sinon.assert.calledOnce(read);
    }));

    it('should call accountCtrl.read with account name and master password', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      validate('read', account, true);
      read.calledWith(account.name, account.masterPassword);
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
      sinon.assert.calledOnce(update);
    }));

    it('should call accountCtrl.update with all account props and master password', sinon.test(function() {
      var update = this.spy(accountCtrl, 'update');
      validate('update', account, true);
      update.calledWith(account.name, account.username, account.password, account.masterPassword);
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
      sinon.assert.calledOnce(destroy);
    }));

    it('should call accountCtrl.delete with account name and master password', sinon.test(function() {
      var destroy = this.spy(accountCtrl, 'delete');
      validate('delete', account, true);
      destroy.calledWith(account.name, account.masterPassword);
    }));
  });

});
