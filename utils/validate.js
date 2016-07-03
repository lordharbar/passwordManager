'use strict';

// Dependencies
var utils = require('./format.js');

// Model
var account = require('../models/account.js');

// Controller
var accountCtrl = require('../controllers/accountCtrl.js');

function validate(command) {
  switch (command) {
    case 'create':
      try {
        var newAccount = accountCtrl.create({
          name: account.name,
          username: account.username,
          password: account.password
        }, account.masterPassword);

        utils.account('New ', newAccount);
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
          utils.account('', fetchedAccount);
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
          utils.account('Updated ', updatedAccount);
        }
      } catch(e) {
        utils.error('Unable to update account!');
      }

      break;
    case 'delete':
      try {
        var deletedAccount = accountCtrl.delete(account.name, account.masterPassword);

        if (deletedAccount === null) {
          utils.error('Account not found!');
        } else {
          utils.account('Deleted ', deletedAccount);
        }
      } catch(e) {
        utils.error('Unable to delete account!');
      }

      break;
    default:
      utils.header();
  }
}

module.exports = validate;
