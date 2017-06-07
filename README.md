# Node Xplorer
### NodeJS interactive shell-like debugger

## Features
Node Xplorer offers an interactive shell to execute javascript commands using a concrete context. The project is made mirroring browser's javascript shells that provide real-time code pushing to code in development.

This package is for development enviroments only. No production build should contain any reference to node-xplorer since it makes use of eval() method

## Instalation

```bash
npm install node-xplorer
```

## Usage
### Pre requesites
Make sure that the javascript file you are intending to debug uses the method module.exports as in the test.js file.

```js
var test = {
	foo : function (){
		console.log('<foo> called and executed')
		return 'foo';
	},

	callback : function (fn){
		console.log('<callback> called')
		setTimeout(function(){
			console.log('<callback> executed')
			fn('callback')
		}, 500)
	},

	promise : function (){
		console.log('<promise> called')
		return new Promise(function(result, error){
			try{
				setTimeout(function(){
					console.log('<promise> executed')
					result('promise')
				}, 500)
			} catch (e){
				error(e);
			}
		})
	},
}

module.exports = test;
```