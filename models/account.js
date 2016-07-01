'use strict';

// Dependencies
var yargs = require('yargs');

yargs.command('create', 'Create a new account', function(yargs) {
		return yargs.options({
			name: {
				demand: true,
				alias: 'n',
				describe: 'Account name (eg: Google, Github)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				describe: 'Account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				describe: 'Account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				describe: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('read', 'Read an existing account', function(yargs) {
		return yargs.options({
			name: {
				demand: true,
				alias: 'n',
				describe: 'Account name (eg: Google, Github)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				describe: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('update', 'Update an existing account', function(yargs) {
		return yargs.options({
			name: {
				demand: true,
				alias: 'n',
				describe: 'Account name (eg: Google, Github)',
				type: 'string'
			},
			username: {
				demand: true,
				alias: 'u',
				describe: 'New account username or email',
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'p',
				describe: 'New account password',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				describe: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.command('delete', 'Delete an existing account', function(yargs) {
		return yargs.options({
			name: {
				demand: true,
				alias: 'n',
				describe: 'Account name (eg: Google, Github)',
				type: 'string'
			},
			masterPassword: {
				demand: true,
				alias: 'm',
				describe: 'Master password',
				type: 'string'
			}
		}).help('help');
	})
	.help('help')
	.argv;

module.exports = yargs.argv;
