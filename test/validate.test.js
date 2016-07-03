'use strict';

// Dependencies
var expect = require('expect');
var validate = require('../utils/validate.js');
var accountCtrl = require('../controllers/accountCtrl.js');

describe('validate', function() {
  var account = {
    name: 'twitter',
    username: '@phillies',
    password: 'tweet123',
    masterPassword: 'master123'
  };

  it('should exist', function() {
    expect(validate).toExist();
  });

  it('should call accountCtrl.create on create command', function() {
    var spy = expect.spyOn(accountCtrl, 'create');

    validate('create', account, true);

    expect(spy).toHaveBeenCalledWith({
      name: account.name,
      username: account.username,
      password: account.password
    }, account.masterPassword);
  });

  it('should call accountCtrl.read on read command', function() {
    var spy = expect.spyOn(accountCtrl, 'read');

    validate('read', account, true);

    expect(spy).toHaveBeenCalledWith(account.name, account.masterPassword);
  });

  it('should call accountCtrl.update on update command', function() {
    var spy = expect.spyOn(accountCtrl, 'update');

    validate('update', account, true);

    expect(spy).toHaveBeenCalledWith(account.name, account.username, account.password, account.masterPassword);
  });

  it('should call accountCtrl.delete on delete command', function() {
    var spy = expect.spyOn(accountCtrl, 'delete');

    validate('delete', account, true);

    expect(spy).toHaveBeenCalledWith(account.name, account.masterPassword);
  });

});
