# Password Manager

Because I am using the `Terminal` every day for work, I thought it would be great to have a simple `Command-Line` app to persist the credentials of all my accounts.

## Installation

Just clone the project by typing:

```
$ git clone https://github.com/philippschulte/passwordManager.git
```

Then change directory into the project folder

```
$ cd passwordManager
```

and run the following command to install all dependencies:

```
$ npm install
```

## Usage

The API provides the basic `CRUD` functionality like:

* Create a new account
* Read an existing account
* Update an existing account
* Delete an existing account

| Commands   | Options          | Alias | Type   | Required | Description               |
| :--------- | :--------------- | :---: | :----: | :------- | :------------------------ |
| **create** | --help		       	|	     	|	       | false    | Help                      |
|		         | --name           | -n	  | String | true     | Account name (eg: GitHub) |
| 		       | --username       | -u    | String | true     | Account username or email |
|		         | --password       | -p	  | String | true     | Account password          |
| 		       | --masterPassword | -u	  | String | true     | Master password           |
| **read**   | --help		       	|	    	|	       | false    | Help                      |
|		         | --name           | -n  	| String | true     | Account name (eg: GitHub) |
| 		       | --masterPassword | -u   	| String | true     | Master password           |
| **update** | --help		      	|	    	|	       | false    | Help                      |
|		         | --name           | -n	  | String | true     | Account name (eg: GitHub) |
| 		       | --username       | -u    | String | true     | Account username or email |
|		         | --password       | -p	  | String | true     | Account password          |
| 		       | --masterPassword | -u	  | String | true     | Master password           |
| **delete** | --help		       	|		    |	       | false    | Help                      |
|		         | --name           | -n  	| String | true     | Account name (eg: GitHub) |
| 		       | --masterPassword | -u	  | String | true     | Master password           |

## Examples

## Tests

To run the test suite, first install the dependencies,

```
$ npm install
```

then run npm test:

```
$ npm test
```

**Important**: If you already added accounts and setup a `master password`, then you have to update the `masterPassword` property in the `config.js` file. Otherwise the tests will fail! 

```javascript
module.exports = {
  test: {
    account: {
      name: 'awesome',
      username: 'foo',
      password: 'bar',
      masterPassword: 'yourMasterPassword'
    }
  }
};
```
