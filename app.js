'use strict';

// Model
var account = require('./models/account.js');

// Controller
var accountCtrl = require('./controllers/accountCtrl.js');

// Command
var command = account._[0];

if (command === 'create') {
  var newAccount = accountCtrl.create({
    name: account.name,
    username: account.username,
    password: account.password
  });

  console.log('New account created!');
  console.log(newAccount);
} else if (command === 'get') {
  var fetchedAccount = accountCtrl.read(account.name);

  if (typeof fetchedAccount === 'undefined') {
    console.log('Account not found!');
  } else {
    console.log('Account found!');
    console.log(fetchedAccount);
  }
}
