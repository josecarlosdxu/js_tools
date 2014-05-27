"use strict";
var ui = (function (window, undefined) {

    var uiPanel,
    /*$$.jUserInterface = function (opts) {
        var jUi = {
            jOpts: $$.extend({}, opts),
            self: this,
            panel: null,
            item: null,
            onfig: {},

            appendState: function (state) {
                console.log("appending state... " + state);
                var uiPanel = $('.uiPanel');
                jUi.item = $('<div class="uiPanel-state" data-js-state="' + state + '">' + state + '</div>').appendTo(uiPanel);
            },

            setState: function (item) {
                $(self).trigger($(this).data("js-state"));
                console.log("state triggered: " + $(this).data("js-state"));
            },

            createPanel: function () {
                console.log("appending panel...");
                jUi.panel = $('body').append('<div class="uiPanel">ui states panel</div>');
                jUi.panel.on('click', '[data-js-state]', jUi.setState);
            },

            init: function () {
                jUi.createPanel();
                return 'ui init';
            }

        };

        //jUi.init();
        return {
            init: jUi.init,
            appendState: jUi.appendState,
            panel: jUi.panel
        };
    };
    window.jUi = $$.jUserInterface;
})(window);




"use strict";
(function (window) {
    $$.jUserInterface = function (opts) {
        var jUi = {
            jOpts: $$.extend({}, opts),
            self: this,
            panel: null,
            item: null,
            onfig: {},

            appendState: function (state) {
                console.log("appending state... " + state);
                var uiPanel = $('.uiPanel');
                jUi.item = $('<div class="uiPanel-state" data-js-state="' + state + '">' + state + '</div>').appendTo(uiPanel);
            },

            setState: function (item) {
                $(self).trigger($(this).data("js-state"));
                console.log("state triggered: " + $(this).data("js-state"));
            },

            createPanel: function () {
                console.log("appending panel...");
                jUi.panel = $('body').append('<div class="uiPanel">ui states panel</div>');
                jUi.panel.on('click', '[data-js-state]', jUi.setState);
            },

            init: function () {
                jUi.createPanel();
                return 'ui init';
            }

        };

        //jUi.init();
        return {
            init: jUi.init,
            appendState: jUi.appendState,
            panel: jUi.panel
        };
    };
    window.jUi = $$.jUserInterface;*/
       init = function () {
            //getElems();
        };

    return {
        init: init
    }

})(window);
