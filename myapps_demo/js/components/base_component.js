/**
 * <p>抽象的基础组件类，用于定义一个抽象组件的属性、行为和生命周期钩子，只暴露API接口不提供行为的实现。</p>
 * <p>目的：统一组件接口</p>
 * 
 * @author Happy
 */
define("components/base_component",[],function(require,exports,module){
    var BaseComponent = {

        render:function(){
            alert('render-11');
        }
    }

    module.exports = BaseComponent;
});