'use strict';

// Dependencies
var storage = require('node-persist');

// Create instance of storage
storage.initSync();

// Account example
// account.name = Github
// account.username = philippschulte
// account.password = thisIsMySecret

function create(account) {
	var accounts = storage.getItemSync('accounts') || [];

	accounts.push(account);

  storage.setItemSync('accounts', accounts);

	return account;
}

function read(accountName) {
  var accounts = storage.getItemSync('accounts') || [];
  var matchedAccount = {};

	accounts.forEach(function(account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

module.exports = {
  create: create,
  read: read
};
