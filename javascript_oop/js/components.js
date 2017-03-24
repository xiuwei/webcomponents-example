(function() {
        var enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'constructor'],
        TemplateClass = function() {},//用于复制原型链
        chain = function(object) {
            TemplateClass.prototype = object;
            var result = new TemplateClass();
            TemplateClass.prototype = null;
            return result;
        },
        /**
         * 扩展类原型
         */
        apply = function(object, config) {
            if (object && config && typeof config === 'object') {
                var i, j, k;

                for (i in config) {
                    object[i] = config[i];
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (config.hasOwnProperty(k)) {
                            object[k] = config[k];
                        }
                    }
                }
            }
        };

    /**
     * Component基类，使用Component.define()方法声明组件继承的顶级父类
     */
    var BaseComponent = function() {};
    apply(BaseComponent, {
        $isClass: true,

        extend: function(SuperClass) {
            var superPrototype = SuperClass.prototype,
                basePrototype, prototype, name;

            prototype = this.prototype = chain(superPrototype);
            this.superclass = prototype.superclass = superPrototype;

            if (!SuperClass.$isClass) {
                basePrototype = BaseComponent.prototype;
                for (name in basePrototype) {
                    if (name in prototype) {
                        prototype[name] = basePrototype[name];
                    }
                }
            }
        },
        /*
        * 扩展类的成员
        */
        addMembers: function(members) {
            var prototype = this.prototype,
                names = [],
                i, ln, name, member;

            for (name in members) {
                names.push(name);
            }

            if (enumerables) {
                names.push.apply(names, enumerables);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];

                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    //如果父类也是一个Component,且添加的成员是一个函数时，在对应的protptype中记录父类对象和父类同名方法的引用，可用于追根溯源，比如调用父类方法等场景
                    if (typeof member == 'function' && !member.$isClass) {
                        member.$owner = this;//记录父类的引用
                        member.$name = name;//记录父类被“重载”方法的引用
                    }

                    prototype[name] = member;
                }
            }

            return this;
        },

    });

    // 定义BaseComponent类的prototype属性
    apply(BaseComponent.prototype, {
        $isInstance: true,

        /**
         * 调用当前方法的父类方法
         *
         * @param {Array/Arguments} args 传递给父类方法的形参
         * @return {Object} 返回父类方法的执行结果
         */
        super: function(args) {
            var method,superMethod;

                method = this.super.caller;//method 是一个 prototyped对象
                if(method){
                    if(!method.$owner){//如果有父类，继续往下找
                        method = method.caller;
                    }
                    if(method){
                      method = superMethod = method.$owner.superclass[method.$name];
                    }
                }
                superMethod = method;
                

            return superMethod.apply(this, args ?  Array.prototype.slice.call(args, 0) : []);
        },

        // Default constructor
        constructor: function() {
            return this;
        },

        render: function(){
            alert('render!!!');
        }
    });


    var makeCtor = function() {
        function constructor() {
            return this.constructor.apply(this, arguments) || null;
        }
        return constructor;
    };

    var extend = function(newComponent, parentComponent) {
        var basePrototype = BaseComponent.prototype,
            SuperClass, superPrototype, name;

        if (parentComponent && parentComponent !== Object) {
            SuperClass = parentComponent;
        } else {
            SuperClass = BaseComponent;
        }

        superPrototype = SuperClass.prototype;

        if (!SuperClass.$isClass) {
            for (name in basePrototype) {
                if (!superPrototype[name]) {
                    superPrototype[name] = basePrototype[name];
                }
            }
        }

        newComponent.extend(SuperClass);
    };


    /**
     * 声明类，类的继承，重写类方法
     */
    var Component = {
        /**
         * 声明一个类，或继承自一个父类，子类拥有父类的所有prototype定义的特性，
         * @param {Object} parentComponent 继承父类
         * @param {Object} overrides 类的属性和方法
         * @return {Klass} The new class
         */
        define: function(parentComponent, overrides) {
            var newComponent, name;

            if (!parentComponent && !overrides) {
                parentComponent = BaseComponent;
                overrides = {};
            } else if (!overrides) {
                overrides = parentComponent;
                parentComponent = BaseComponent;
            }

            newComponent = makeCtor();
            for (name in BaseComponent) {
                newComponent[name] = BaseComponent[name];
            }
            if (overrides.statics) {
                newComponent.addStatics(overrides.statics);
                delete overrides.statics;
            }
            extend(newComponent, parentComponent);
            newComponent.addMembers(overrides);

            return newComponent;
        }
    };

    
    if (typeof window === 'object' && typeof window.document === 'object') {
        window.Component = Component;
    }
}());