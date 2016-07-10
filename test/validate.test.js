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
    var create = sinon.spy(accountCtrl, 'create');

    afterEach(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call accountCtrl.create once', function() {
      validate('create', account, true);
      create.restore();
      sinon.assert.calledOnce(create);
    });

    it('should call accountCtrl.create with all account props and master password', function() {
      validate('create', account, true);
      create.restore();
      create.calledWith({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });
  });

  describe('#read', function() {
    var read = sinon.spy(accountCtrl, 'read');

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

    it('should call accountCtrl.read once', function() {
      validate('read', account, true);
      read.restore();
      sinon.assert.calledOnce(read);
    });

    it('should call accountCtrl.read with account name and master password', function() {
      validate('read', account, true);
      read.restore();
      read.calledWith(account.name, account.masterPassword);
    });
  });

  describe('#update', function() {
    var update = sinon.spy(accountCtrl, 'update');

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

    it('should call accountCtrl.update once', function() {
      validate('update', account, true);
      update.restore();
      sinon.assert.calledOnce(update);
    });

    it('should call accountCtrl.update with all account props and master password', function() {
      validate('update', account, true);
      update.restore();
      update.calledWith(account.name, account.username, account.password, account.masterPassword);
    });
  });

  describe('#delete', function() {
    var destroy = sinon.spy(accountCtrl, 'delete');

    beforeEach(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    it('should call accountCtrl.delete once', function() {
      validate('delete', account, true);
      destroy.restore();
      sinon.assert.calledOnce(destroy);
    });

    it('should call accountCtrl.delete with account name and master password', function() {
      validate('delete', account, true);
      destroy.restore();
      destroy.calledWith(account.name, account.masterPassword);
    });
  });

});
