'use strict';

// Dependencies
var expect = require('expect');
var accountCtrl = require('../controllers/accountCtrl.js');
var storageCtrl = require('../controllers/storageCtrl.js');

describe('accountCtrl', function() {
  var account = {
    name: 'twitter',
    username: '@phillies',
    password: 'tweet123',
    masterPassword: 'master123'
  };

  var spy_1 = expect.spyOn(storageCtrl, 'get');
  var spy_2 = expect.spyOn(storageCtrl, 'set');

  beforeEach(function() {
    spy_1.andCallThrough();
    spy_2.andCallThrough();
  });

  it('should exist', function() {
    expect(accountCtrl).toExist();
  });

  describe('create', function() {
    afterEach(function () {
      spy_1.restore();
      spy_2.restore();

      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should save the new account locally', function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);

      var matchedAccount = accountCtrl.read(account.name, account.masterPassword);

      expect(matchedAccount).toEqual({name: account.name, username: account.username, password: account.password});
    });

    it('should return the new account', function() {
      var newAccount = accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);

      expect(newAccount).toEqual({name: account.name, username: account.username, password: account.password});
    });
  });

  describe('read', function() {
    before(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    afterEach(function () {
      spy_1.restore();
      spy_2.restore();
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should return the account if it exists', function() {
      var matchedAccount = accountCtrl.read(account.name, account.masterPassword);

      expect(matchedAccount).toEqual({name: account.name, username: account.username, password: account.password});
    });

    it('should return null if the account does not exist', function() {
      var matchedAccount = accountCtrl.read('facebook', account.masterPassword);

      expect(matchedAccount).toEqual(null);
    });
  });

  describe('update', function() {
    before(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    afterEach(function () {
      spy_1.restore();
      spy_2.restore();
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should update the account if it exists', function() {
      var updatedAccount = accountCtrl.update(account.name, '@philippschulte', 'tweets123', account.masterPassword);

      expect(updatedAccount).toNotEqual(account);
      expect(updatedAccount).toEqual({name: account.name, username: '@philippschulte', password: 'tweets123'});
    });

    it('should return null if the account does not exist', function() {
      var updatedAccount = accountCtrl.update('facebook', 'Philipp Schulte', 'facebook123', account.masterPassword);

      expect(updatedAccount).toEqual(null);
    });
  });

  describe('delete', function() {
    before(function() {
      accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);
    });

    afterEach(function () {
      spy_1.restore();
      spy_2.restore();
    });

    after(function() {
      accountCtrl.delete(account.name, account.masterPassword);
    });

    it('should delete the account if it exists', function() {
      accountCtrl.delete(account.name, account.masterPassword);

      var matchedAccount = accountCtrl.read(account.name, account.masterPassword);

      expect(matchedAccount).toEqual(null);
    });

    it('should return null if the account does not exist', function() {
      var deletedAccount = accountCtrl.delete('facebook', account.masterPassword);

      expect(deletedAccount).toEqual(null);
    });
  });

});
