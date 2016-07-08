'use strict';

// Dependencies
var storage = require('node-persist');
var cryptoJS = require('crypto-js');

// Create instance of storage
storage.initSync();

function get(masterPassword, filename) {
  var encryptedAccounts = storage.getItemSync(filename);
  var accounts = [];

  if (typeof encryptedAccounts !== 'undefined') {
    var bytes = cryptoJS.AES.decrypt(encryptedAccounts.toString(), masterPassword);
    accounts = JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
  }

  return accounts;
}

function set(accounts, masterPassword, filename) {
  var encryptedAccounts = cryptoJS.AES.encrypt(JSON.stringify(accounts), masterPassword);

  storage.setItemSync(filename, encryptedAccounts.toString());
}

module.exports = {
  get: get,
  set: set
};
