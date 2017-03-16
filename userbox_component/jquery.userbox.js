/**
 * userbox 
 * 
 * Copyright 2016 Teemlink
 * Vsrsion 0.1
 * 
 */
(function($){
	
	/**
	 * 初始化,构建用户选择组件DOM
	 */
	function _createBox(target){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('元素 ID: ['+$(target).attr("id")+']正在初始化,渲染用户选择框...');
	}
	
	/**
	 * 打开用户选择面板（完整模式下可用）
	 */
	function _open(target){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('call open method');
		if(opts.onOpen){
			opts.onOpen.apply(this,arguments);
		}
	}
	/**
	 * 关闭用户选择面板（完整模式下可用）
	 */
	function _close(target){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('call close method');
		if(opts.onClose){
			opts.onClose.apply(this,arguments);
		}
	}
	
	/**
	 * 选中用户
	 */
	function _select(target,user){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		
		if(opts.onSelect){
			opts.onSelect.apply(this,arguments);
		}
	}
	/**
	 * 取消选中用户
	 */
	function _unSelect(target,user){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		
		if(opts.onUnSelect){
			opts.onUnSelect.apply(this,arguments);
		}
	}
	
	/**
	 * 设置已选用户
	 */
	function _setSelects(target,users){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('call setSelects method');
	}
	/**
	 * 获取已选中用户集合
	 */
	function _getSelects(target){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('call getSelects method');
		return [];
	}
	/**
	 * 清空已选中用户
	 */
	function _clear(target){
		var state = $.data(target, 'userbox');
		var opts = state.options;
		//TODO
		alert('call clear method');
		if(opts.onClear){
			opts.onClear.apply(this,arguments);
		}
	}
	/**
	 * 解析属性
	 */
	function parseOptions(target){
		var t = $(target);
		return {
			multiple: (t.attr('multiple') ? (t.attr('multiple') == 'true' || t.attr('multiple') == true) : undefined),
			mode: (t.attr('mode') || undefined),
			options: (t.attr('options') || undefined),
			tabs: (t.attr('tabs') || undefined),
			width: (t.attr('width') || undefined),
			disabled: (t.attr('disabled') ? true : undefined),
			required: (t.attr('required') ? (t.attr('required') == 'true' || t.attr('required') == true) : undefined),
			separator: (t.attr('separator') || undefined),
		};
	}
	
	$.fn.userbox = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.userbox.methods[options];
			if (method){
				return method(this, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'userbox');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'userbox', {
					options: $.extend({}, $.fn.userbox.defaults, $.fn.userbox.parseOptions(this), options)
				});
			}
			_createBox(this);
		});
	};
	
	$.fn.userbox.methods = {
		
		open: function(target){
			return target.each(function(){
				_open(this);
			});
		},
		close: function(target){
			return target.each(function(){
				_close(this);
			});
		},
		setSelects: function(target, value){
			return target.each(function(){
				_setSelects(this, value);
			});
		},
		getSelects: function(target){
			return _getSelects(target[0]);
		},
		clear: function(target){
			return target.each(function(){
				_close(this);
			});
		},
	};
	
	$.fn.userbox.parseOptions = function(target){
		return parseOptions(target);
	};
	
	$.fn.userbox.defaults = {
			multiple: false,//是否多选模式
			mode: 'all',//simple:精简模式|all:完整模式
			tabs: [{name:'全部',url: '/contacts/getAllUser.action'},
			       {name:'部门',url: '/contacts/getContactsTree.action'},
			       {name:'角色',url: '/contacts/getApplicationAndRoleContactsTree.action'},
			       {name:'常用',url: '/contacts/getFavoriteContacts.action'}
			       ],
			width: 'auto',//宽度
			disabled: false,//是否禁用
			required: false,//是否必填
			separator: ';',//多选模式下的分隔符
			
			onSelect: undefined,
			onUnSelect: undefined,
			onSuccess: undefined,
			onOpen: undefined,
			onClose: undefined,
			onClear: undefined
	};
})(jQuery);
$("[xtype='userbox']").userbox();