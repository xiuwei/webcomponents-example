define("examples/hello/main",["./hello"],function(require){
	var Hello = require("./hello");
	var h = new Hello("#container");
	setTimeout(function(){
		h.render();
	},3000);
	
});