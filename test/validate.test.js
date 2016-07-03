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

});
