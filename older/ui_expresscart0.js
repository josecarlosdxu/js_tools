"use strict";
var expressCart = (function (window, undefined) {
    var nodeList = {},
        patternMatch = 'data-js-expresscart',
        cartBtn,
        cartPanel,
        objects = {
            cartBtn: null,
            cartPanel: null,
        },
        toggleMethodList = [addClass, removeClass],
        toggleListenersMethods = [addEventHandler, removeEventHandler],
        toggleMethod,
        showPanelClassname = 'expresscart--show',
        showBtnClassname = 'toolbar-item--active',
        isShow = false,
        attribute,
        nodetItem,
        elementItem,
        interval,

        closePanel = function () {
            removeClass(cartPanel, showPanelClassname);
            removeClass(cartBtn, showBtnClassname);
            isShow = false;
        },
        
        checkIsOver = function () {
            var condition1 = cartPanel.parentElement.querySelector(':hover') === cartPanel,
                condition2 = cartBtn.parentElement.querySelector(':hover') === cartBtn;
            if (!condition1 && !condition2) {
                clearInterval(interval);
                interval = null;
                closePanel();
            }
        },

        togglePanel = function () {
            toggleMethod = toggleMethodList[Number(isShow)];
            toggleMethod(cartPanel, showPanelClassname);
            toggleMethod(cartBtn, showBtnClassname);
            isShow = !isShow;
            if (isShow) {
                interval = setInterval(checkIsOver, 1000);
            } else {
                clearInterval(interval);
                interval = null;
            }
        },

        setListeners = function () {
            cartBtn = objects.cartBtn;
            cartPanel = objects.cartPanel;
            addEventHandler(cartBtn, 'click', togglePanel);
        },

        getElems = function () {
            nodeList = document.querySelectorAll('[' + patternMatch + ']');
            for (var x = 0; nodetItem = nodeList[x]; x++) {
                attribute = nodetItem.getAttribute(patternMatch);

                if (attribute === 'expresscart') {
                    objects.cartPanel = nodetItem;
                } else {
                    objects.cartBtn = nodetItem;
                }
            }            
            setListeners();
        },
        init = function () {
            getElems();

        };

    return {
        init: init
    }

})(window);