var test = {

	//Simple function

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