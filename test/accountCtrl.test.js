'use strict';

// Dependencies
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var accountCtrl = require('../controllers/accountCtrl.js');
var storageCtrl = require('../controllers/storageCtrl.js');

// Chai setup
chai.should();
chai.use(sinonChai);

describe('accountCtrl', function() {
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

    it('should call storageCtrl.get once', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
      get.should.have.been.calledOnce;
    }));

    it('should call storageCtrl.get with the master password', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
      get.should.have.been.calledWithExactly(account.masterPassword);
    }));

    it('should call storageCtrl.set once', sinon.test(function() {
      var set = this.spy(storageCtrl, 'set');
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
      set.should.have.been.calledOnce;
    }));

    it('should call storageCtrl.set with all accounts and with the master password', sinon.test(function() {
      var set = this.spy(storageCtrl, 'set');
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
      set.should.have.been.calledWithExactly([{name: account.name, username: account.username, password: account.password}], account.masterPassword);
    }));

    it('should return the new account', sinon.test(function() {
      var create = this.spy(accountCtrl, 'create');
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
      create.should.have.returned({name: account.name, username: account.username, password: account.password});
    }));
  });

  describe('#read', function() {
    before(function() {
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call storageCtrl.get once', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.read(account.name, account.masterPassword);
      get.should.have.been.calledOnce;
    }));

    it('should call storageCtrl.get with the master password', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.read(account.name, account.masterPassword);
      get.should.have.been.calledWithExactly(account.masterPassword);
    }));

    it('should return the matched account if it exists', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      accountCtrl.read(account.name, account.masterPassword);
      read.should.have.returned({name: account.name, username: account.username, password: account.password});
    }));

    it('should return null if the account does not exist', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      accountCtrl.read('facebook', account.masterPassword);
      read.should.have.returned(null);
    }));
  });

  describe('#update', function() {
    before(function() {
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call storageCtrl.get once', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.update(account.name, '@philippschulte', 'tweets123', account.masterPassword);
      get.should.have.been.calledOnce;
    }));

    it('should call storageCtrl.get with the master password', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.update(account.name, '@philippschulte', 'tweets123', account.masterPassword);
      get.should.have.been.calledWithExactly(account.masterPassword);
    }));

    it('should return the updated account if it exists', sinon.test(function() {
      var update = this.spy(accountCtrl, 'update');
      accountCtrl.update(account.name, '@philippschulte', 'tweets123', account.masterPassword);
      update.should.have.returned({name: account.name, username: '@philippschulte', password: 'tweets123'});
    }));

    it('should return null if the account does not exist', sinon.test(function() {
      var update = this.spy(accountCtrl, 'update');
      accountCtrl.update('facebook', 'Philipp Schulte', 'facebook123', account.masterPassword);
      update.should.have.returned(null);
    }));
  });

  describe('#delete', function() {
    beforeEach(function() {
      accountCtrl.create({name: account.name, username: account.username, password: account.password}, account.masterPassword);
    });

    afterEach(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should call storageCtrl.get once', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.delete(account.name, account.masterPassword);
      get.should.have.been.calledOnce;
    }));

    it('should call storageCtrl.get with the master password', sinon.test(function() {
      var get = this.spy(storageCtrl, 'get');
      accountCtrl.delete(account.name, account.masterPassword);
      get.should.have.been.calledWithExactly(account.masterPassword);
    }));

    it('should delete the account if it exists', sinon.test(function() {
      var read = this.spy(accountCtrl, 'read');
      accountCtrl.read(account.name, account.masterPassword);
      read.should.have.returned({name: account.name, username: account.username, password: account.password});
      read.reset();
      accountCtrl.delete(account.name, account.masterPassword);
      accountCtrl.read(account.name, account.masterPassword);
      read.should.have.returned(null);
    }));

    it('should return the deleted account if it exists', sinon.test(function() {
      var destroy = this.spy(accountCtrl, 'delete');
      accountCtrl.delete(account.name, account.masterPassword);
      destroy.should.have.returned({name: account.name, username: account.username, password: account.password});
    }));

    it('should return null if the account does not exist', sinon.test(function() {
      var destroy = this.spy(accountCtrl, 'delete');
      accountCtrl.delete('facebook', account.masterPassword);
      destroy.should.have.returned(null);
    }));
  });

});
