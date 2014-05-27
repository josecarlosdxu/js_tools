var toolbarLanguages = (function (window, undefined) {
    "use strict";
    var languagesNav,
    languagesPanel,
    languagesBtn,
    eventToolbar,
    delayHide = 2000,
    delayFade = 150,
    patternMatch = 'data-js-toolbar-languages',

    hidePanel= function(e) {
        removeClass(languagesBtn,'toolbar-item--active');
        $(languagesPanel).fadeOut(delayFade);
    },

    checkNavOut = function() {
        var timeOutMainNav,
        target,
        isNav,
        delayCheck =function(){
           $('body').on('mousemove', function(evt) {
                $('body').off('mousemove');
                evt.preventDefault();
                evt.stopPropagation();
                clearTimeout(timeOutMainNav);
                timeOutMainNav = null;
                target = $(evt.target);
                isNav = target.parents('[data-js-toolbar-languages="toolbar-languages"]').length > 0;
                if(!isNav) {
                    hidePanel();
                } else {
                    timeOutMainNav = setTimeout(delayCheck, delayHide);
                }
            });
        };

        timeOutMainNav = setTimeout(delayCheck, delayHide);
    },

    togglePanel = function(e) {
        var target =  e.target;
        if(target === languagesBtn) {
            $(languagesPanel).fadeToggle(delayFade);
            checkNavOut();
        } else {
            hidePanel();
        }
    },


    btnClick= function(e) {
        if(e.type === 'mouseleave'){
            var time = setTimeout (hidePanel,delayFade);
            return;
        }
        languagesBtn.dispatchEvent(eventToolbar);
        addClass(languagesBtn, 'toolbar-item--active');
    },
    setListeners= function () {
        eventToolbar = eventBuilder('toolbarEvent');
        languagesBtn.prototype = new EventDispatcher();
        addEventHandler(languagesBtn, 'click', btnClick);
        addEventHandler(languagesNav, 'mouseleave', btnClick);
        addEventHandler(document.documentElement,'toolbarEvent',togglePanel);
    },

    getElems = function () {
        languagesNav = document.querySelector('[' + patternMatch + '="toolbar-languages"]');
        languagesBtn = document.querySelector('[' + patternMatch + '="toolbar-languages-btn"]');
        languagesPanel = document.querySelector('[ data-js-langlist ="langlist"]');
        setListeners();
    },

    init = function () {
        getElems();
    };
    return {
        init: init
    }

})(window);
