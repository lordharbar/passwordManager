'use strict';

// Dependencies
var format = require('./format.js');

// Controller
var accountCtrl = require('../controllers/accountCtrl.js');

function validate(command, account, silent) {
  switch (command) {
    case 'create':
      try {
        var newAccount = accountCtrl.create({
          name: account.name,
          username: account.username,
          password: account.password
        }, account.masterPassword);

        if (!silent) format.account('New ', newAccount);
      } catch(e) {
        if (!silent) format.error('Unable to create account!');
      }

      break;
    case 'read':
      try {
        var fetchedAccount = accountCtrl.read(account.name, account.masterPassword);

        if (fetchedAccount === null) {
          if (!silent) format.error('Account not found!');
        } else {
          if (!silent) format.account('', fetchedAccount);
        }
      } catch(e) {
        if (!silent) format.error('Unable to fetch account!');
      }

      break;
    case 'update':
      try {
        var updatedAccount = accountCtrl.update(account.name, account.username, account.password, account.masterPassword);

        if (updatedAccount === null) {
          if (!silent) format.error('Account not found!');
        } else {
          if (!silent) format.account('Updated ', updatedAccount);
        }
      } catch(e) {
        if (!silent) format.error('Unable to update account!');
      }

      break;
    case 'delete':
      try {
        var deletedAccount = accountCtrl.delete(account.name, account.masterPassword);

        if (deletedAccount === null) {
          if (!silent) format.error('Account not found!');
        } else {
          if (!silent) format.account('Deleted ', deletedAccount);
        }
      } catch(e) {
        if (!silent) format.error('Unable to delete account!');
      }

      break;
    default:
      if (!silent) format.header();
  }
}

module.exports = validate;
