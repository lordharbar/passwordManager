'use strict';

// Controller
var storageCtrl = require('./storageCtrl.js');

// Account example
// account.name = Github
// account.username = philippschulte
// account.password = thisIsMySecret

function create(account, masterPassword) {
	var accounts = storageCtrl.get(masterPassword);

	accounts.push(account);

	storageCtrl.set(accounts, masterPassword);

	return account;
}

function read(accountName, masterPassword) {
	var accounts = storageCtrl.get(masterPassword);
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
