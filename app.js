'use strict';

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

      console.log('New account created!');
      console.log(newAccount);
    } catch(e) {
      console.log('Unable to create account!');
    }

    break;
  case 'get':
    try {
      var fetchedAccount = accountCtrl.read(account.name, account.masterPassword);

      if (typeof fetchedAccount === 'undefined') {
        console.log('Account not found!');
      } else {
        console.log('Account found!');
        console.log(fetchedAccount);
      }
    } catch(e) {
      console.log('Unable to fetch account!');
    }

    break;
}
