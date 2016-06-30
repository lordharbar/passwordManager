'use strict';

// Dependencies
var utils = require('./utils/formatting.js');

// Model
var account = require('./models/account.js');

// Controller
var accountCtrl = require('./controllers/accountCtrl.js');

// Command
var command = account._[0];

switch (command) {
  case 'create':
    try {
      var newAccount = accountCtrl.create({
        name: account.name,
        username: account.username,
        password: account.password
      }, account.masterPassword);

      utils.account(newAccount);
    } catch(e) {
      utils.error('Unable to create account!');
    }

    break;
  case 'read':
    try {
      var fetchedAccount = accountCtrl.read(account.name, account.masterPassword);

      if (fetchedAccount === null) {
        utils.error('Account not found!');
      } else {
        utils.account(fetchedAccount);
      }
    } catch(e) {
      utils.error('Unable to fetch account!');
    }

    break;
  case 'update':
    try {
      var updatedAccount = accountCtrl.update(account.name, account.username, account.password, account.masterPassword);

      if (updatedAccount === null) {
        utils.error('Account not found!');
      } else {
        utils.account(updatedAccount);
      }
    } catch(e) {
      utils.error('Unable to update account!');
    }

    break;
  default:
    utils.header();
}
