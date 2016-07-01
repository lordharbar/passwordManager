'use strict';

function header() {
  console.log('/**\n' +
              '* @Password Manager\n' +
              '*\n' +
              '* @description\n' +
              '*\n' +
              '* This app helps you to manage your passwords. You can\n' +
              '* save, read, update, and delete your account credentials.\n' +
              '*\n' +
              '* @commands\n' +
              '*\n' +
              '* node app --help\n' +
              '* node app create --help\n' +
              '* node app get --help\n' +
              '* node app update --help\n' +
              '* node app delete --help\n' +
              '*/'
  );
}

function account(status, account) {
  console.log('/**\n' +
              '* @' + status + 'Account\n' +
              '*\n' +
              '* Name: ' + account.name + '\n' +
              '* Username: ' + account.username + '\n' +
              '* Password: ' + account.password + '\n' +
              '*/'
  );
}

function error(message) {
  console.log('/**\n' +
              '* @Error\n' +
              '*\n' +
              '* ' + message + '\n' +
              '*/'
  );
}

module.exports = {
  header: header,
  account: account,
  error: error
};
