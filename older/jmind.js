;(function (window, undefined) {
    "use strict";
    var jMPriv = {
        toType: function (obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        },
        setArgs: function (str) {
            var core = this.core;
            //core.args && (str = core.args); 
            if (core.args) {
                str = core.args;
            }
            str = str || '';
            core.args = '';
            return str;
        },
        createElem: function (tag, vals, target) {
            var elem = document.createElement(tag),
                values = vals || {};

            for (var u in values) {
                elem.setAttribute(u, values[u]);
            }
            if (target) {
                target.appendChild(elem);
            }
            return elem;
        }
    },
        jMind = (function () {
            var core = function (args) {
                return new core.fn.init(args);
            };
            core.fn = core.prototype = {
                init: function (args) {
                    core.args = args;
                    return jMind;
                }
            };
            // Methods goes here
            core.trim = function (str) {
                return jMPriv.setArgs(str).replace(/^\s+|\s+$/g, '');
            };
            core.isType = function (str) {
                var strobj = jMPriv.setArgs(str);
                return jMPriv.toType(strobj);
            };
            core.createElem = function (tag, values, target) {
                return jMPriv.createElem(tag, values, target);
            };
            core.extend = function (str) {
                var strobj = jMPriv.setArgs(str);
                return jMPriv.toType(strobj);
            };
            core.extend = function (obj1, obj2) {
                var obj3 = {};
                for (var attrname in obj1) {
                    if (obj1.hasOwnProperty(attrname)) {
                        obj3[attrname] = obj1[attrname];
                    }
                }
                for (var attr in obj2) {
                    if (obj2.hasOwnProperty(attr)) {
                        obj3[attr] = obj2[attr];
                    }
                }
                return obj3;
            };
            // Return
            jMPriv.core = core;
            return core;
        })();
    window.jMind = window.$$ = jMind;
})(window);
/*console.log( $$.trim( '  Hola Mundo  ') ) ;  // Retrocompatibilidad con la forma anterior.
 console.log( $$('  Hola Mundo  ').trim() ) ; // Nueva invocación por declaración.
 var obj1 = {
 food: 'pizza',
 car: 'ford'
 },
 obj2 = {
 animal: 'dog'
 };
 var obj1 = {
 food: 'pizza',
 car: 'ford'
 },
 obj2 = {
 animal: 'dog'
 };
 console.log($$.extend(obj1, obj2));/**/