define("examples/hello/hello",["jquery"],function(require,exports,module){
	var $ = require("jquery");
	function Hello(container){
		this.container = $(container);
		this.words = [];
		this._init();
	};
	module.exports = Hello;

	Hello.prototype._init = function() {
		this.container.html('<h1>初始化就这个样子了!</h1>');
	};
	Hello.prototype.render = function() {
		this.container.html('<h1>没错，我就是渲染方法！</h1>');
	};
});