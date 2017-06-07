var debug = {

	colors : {
		reset : "\x1b[0m",
		bright : "\x1b[1m",
		dim : "\x1b[2m",
		underscore : "\x1b[4m",
		blink : "\x1b[5m",
		reverse : "\x1b[7m",
		hidden : "\x1b[8m",

		fgBlack : "\x1b[30m",
		fgRed : "\x1b[31m",
		fgGreen : "\x1b[32m",
		fgYellow : "\x1b[33m",
		fgBlue : "\x1b[34m",
		fgMagenta : "\x1b[35m",
		fgCyan : "\x1b[36m",
		fgWhite : "\x1b[37m",

		bgBlack : "\x1b[40m",
		bgRed : "\x1b[41m",
		bgGreen : "\x1b[42m",
		bgYellow : "\x1b[43m",
		bgBlue : "\x1b[44m",
		bgMagenta : "\x1b[45m",
		bgCyan : "\x1b[46m",
		bgWhite : "\x1b[47m"
	},

	_console : function (){
		var self = this
		var _log = console.log 
		var _warn = console.warn 
		var _error = console.error 

		
		console.log = function(){
			var args = arguments

			Array.prototype.unshift.call(
				arguments, 
				self.colors.bgBlack,
				self.colors.fgWhite
			);

			Array.prototype.push.call(
				arguments,
				self.colors.reset
			)
            _log.apply(this, arguments)
		}

		console.error = function(){
			var args = arguments

			Array.prototype.unshift.call(
				arguments, 
				self.colors.bgRed,
				self.colors.fgWhite,
				'>>>'
			);

			Array.prototype.push.call(
				arguments,
				self.colors.reset
			)
            _error.apply(this, arguments)
		}

		console.warn = function(){
			var args = arguments

			Array.prototype.unshift.call(
				arguments, 
				self.colors.bgYellow,
				self.colors.fgBlack,
				'>>>'
			);

			Array.prototype.push.call(
				arguments,
				self.colors.reset
			)
            _warn.apply(this, arguments)
		}

		console.ui = function(){
			var args = arguments

			Array.prototype.unshift.call(
				arguments, 
				self.colors.bgBlack,
				self.colors.fgWhite,
				'#####  '
			);

			Array.prototype.push.call(
				arguments,
				'  #####',
				self.colors.reset
			)
            _log.apply(this, arguments)
		}
	},

	init : function (){
		var self = this;
		self._console();

		process.stdin.resume();
		process.stdin.setEncoding('utf8');

		process.stdin.on('data', function(text){
			self.process(self, text)
		})

		

		console.ui('Node Xplorer initialized')
	},

	is_reserved_word : function (data){
		var self = this;

		if (data === 'exit'){
			self._fn()
			return true;
		}

		if (data === 'clear'){
			process.stdout.write('\033c');
			return true;
		}

		return false;
	},

	process : function (s, text){
		try{
			var self = s;

			var clean = text.replace(/(\r\n|\n|\r)/gm, '')
			var exec = clean.replace('var ', 'global.')

			if (!self.is_reserved_word(exec)){
				eval(exec)
			}
			
		} catch (e){
			console.warn(e)
		}
	},

	_fn : function (){
		console.ui('Exiting Node Xplorer');
		process.exit();
	}
}

debug.init()

var _varname;
process.argv.forEach(function (val, index, array) {

	if (index === 2){
		_varname = val
	}

	if (index === 3){
		global[_varname]= require(val)
	}
});
