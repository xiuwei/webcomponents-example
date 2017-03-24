define("demo/main",["./hello","utils/component_factory"],function(require){
	debugger;
	var ComponentFactory = require("utils/component_factory");
	var P = ComponentFactory.define({
		constructor: function(name) {
			this.name = name;
		},
		hello:function(){
			alert("hello "+this.name);
		},
		hello3:function(arg){
			alert('parent -->hello3 '+arg);
		}

	});

	var P2 = ComponentFactory.define(P,{
		id:'',
		hello2:function(){
			alert("hello2 "+this.id);
		},
		hello3:function(){
			this.super('hahah');
		}
	});

    var p = new P2('world');
	p.id = "i am 'id'";
	p.hello();
	p.hello2();
	p.hello3();
	p.render();
	
});