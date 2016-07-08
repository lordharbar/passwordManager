'use strict';

// Controller
var storageCtrl = require('./storageCtrl.js');

// Filename for node-persist
var filename = 'accounts';

// Account example
// account.name = Github
// account.username = philippschulte
// account.password = thisIsMySecret

function create(account, masterPassword) {
	var accounts = storageCtrl.get(masterPassword, filename);

	accounts.push(account);

	storageCtrl.set(accounts, masterPassword, filename);

	return account;
}

function read(accountName, masterPassword) {
	var accounts = storageCtrl.get(masterPassword, filename);
  var matchedAccount = null;

	accounts.forEach(function(account) {
		if (account.name === accountName) {
			matchedAccount = account;
		}
	});

	return matchedAccount;
}

function update(accountName, accountUsername, accountPassword, masterPassword) {
	var accounts = storageCtrl.get(masterPassword, filename);
	var updatedAccount = null;

	accounts.forEach(function(account) {
		if (account.name === accountName) {
			account.username = accountUsername;
			account.password = accountPassword;

			storageCtrl.set(accounts, masterPassword, filename);

			updatedAccount = account;
		}
	});

	return updatedAccount;
}

function remove(accountName, masterPassword) {
	var accounts = storageCtrl.get(masterPassword, filename);
	var deletedAccount = null;

	accounts.forEach(function(account, index) {
		if (account.name === accountName) {
			accounts.splice(index, 1);

			storageCtrl.set(accounts, masterPassword, filename);

			deletedAccount = account;
		}
	});

	return deletedAccount;
}

module.exports = {
	create: create,
	read: read,
	update: update,
	delete: remove
};
