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

**A new directory called `persist` will be created with the first account. The entire data will be hashed before it will be saved to the disk! You'll need the `master password` for all operations. The `master password` will be defined after the first account has been saved to the disk! Don't forget the `master password` because without there is no way to decrypt the data!**

## Examples

Lets create, read, update, and delete a account. Open the `command line` and change directory to the root of the project.

### Command: create

`Help`:

```
$ node pm create --help
```

```
$ node pm create -n GitHub -u johndoe -p password123 -m master123
```

`Output`:

```
/**
* @New Account
*
* Name: GitHub
* Username: johndoe
* Password: password123
*/
```

### Command: read

`Help`:

```
$ node pm read --help
```

```
$ node pm read -n GitHub -m master123
```

`Output`:

```
/**
* @Account
*
* Name: GitHub
* Username: johndoe
* Password: password123
*/
```

### Command: update

`Help`:

```
$ node pm update --help
```

```
$ node pm update -n GitHub -u john.doe@gmail.com -p newPassword -m master123
```

`Output`:

```
/**
* @Updated Account
*
* Name: GitHub
* Username: john.doe@gmail.com
* Password: newPassword
*/
```

### Command: delete

`Help`:

```
$ node pm delete --help
```

```
$ node pm delete -n GitHub -m master123
```

`Output`:

```
/**
* @Deleted Account
*
* Name: GitHub
* Username: john.doe@gmail.com
* Password: newPassword
*/
```

## Tests

To run the test suite, first install the dependencies,

```
$ npm install
```

then run npm test:

```
$ npm test
```

**Important**: If you already created an account and setup a `master password`, then you have to update the `masterPassword` property in the `config.js` file. Otherwise the tests will fail!

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
