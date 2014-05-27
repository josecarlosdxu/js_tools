//Module cavaDots
"use strict";
(function (window) {
    $$.jExpresscart = function (opts) {
        var jEx = {
            jOpts: $$.extend({

                cartNav: null,
                cartBtn: null,
                cartPanel: null,
                target: null,
                eventsAdded: false,
                callBackSequence: [],
                elemList: [],
                eventsList: ['mouseover', 'mouseleave'],
                delayedTime: 200

            }, opts),            

            addOrRemoveEvents: function (handler) {
                var len = jEx.jOpts.elemList.length,
                i,
                elem,
                elemEvt,
                method = jEx.togglePanel,
                methodHandler = handler === true ? 'addEventHandler' : 'removeEventHandler';                
                for(i=0;i<len;i++){
                    elem = jEx.jOpts.elemList[i];
                    elemEvt = jEx.jOpts.eventsList[i];
                    window[methodHandler](elem, elemEvt, method);                               
                } 
                 window[methodHandler](document.body, 'mouseover', method);
                jEx.jOpts.eventsAdded = handler;
            },

            hidePanel: function () {
                var cartPanel = jEx.jOpts.cartPanel,
                delayedTime = jEx.jOpts.delayedTime,
                cartBtn = jEx.jOpts.cartBtn;
                removeClass(cartBtn, 'toolbar-item--active');
                $(cartPanel).fadeOut(delayedTime);
                jEx.jOpts.callBackSequence = [];
                jEx.addOrRemoveEvents(false);
                
            },

            processSequence: function () {
                for (var i = 0, len = jEx.jOpts.callBackSequence.length; i < len; i++) {
                    var elemCurrent = jEx.jOpts.callBackSequence[i].current;
                    if (elemCurrent === document.body) {
                        jEx.hidePanel();
                    }
                }

                if (jEx.jOpts.callBackSequence.length > 3) {
                    jEx.jOpts.callBackSequence = [];
                }

            },

            togglePanel: function (e) {
                var target = e.target,
                current = e.currentTarget,
                typeEvt = e.type,               
                delayedTime = jEx.jOpts.delayedTime,
                itemSequence,
                cartPanel = jEx.jOpts.cartPanel,
                cartBtn = jEx.jOpts.cartBtn;
                e.preventDefault();
                e.stopPropagation();
                switch (typeEvt) {
                    case 'click':
                        classToggle(cartBtn, 'toolbar-item--active');
                        cartPanel.style.zIndex = '4000';
                        $(cartPanel).fadeToggle(delayedTime);
                        if(!jEx.jOpts.eventsAdded){
                            jEx.addOrRemoveEvents(true); 
                        }                                          
                        
                    break;
                    default:
                        itemSequence = {};
                        itemSequence.typeEvt = typeEvt;
                        itemSequence.target = target;
                        itemSequence.current = current;
                        jEx.jOpts.callBackSequence.push(itemSequence);
                        jEx.processSequence();
                }

            },

            btnClickEvent: function () {
                var cartBtn = jEx.jOpts.cartBtn,
                cartPanel = jEx.jOpts.cartPanel;
                cartBtn.prototype = new EventDispatcher();
                jEx.jOpts.elemList = [cartBtn, cartPanel]
                addEventHandler(cartBtn, 'click', jEx.togglePanel);
            },
            setOptionsValues: function () {
                jEx.jOpts.cartBtn = getElementByAttribute('data-js-toolbar-expresscart', 'toolbar-expresscart-btn'),
                jEx.jOpts.cartPanel = getElementByAttribute('data-js-toolbar-expresscart', 'toolbar-expresscart');
                jEx.btnClickEvent();                
            },

            init: function () {
                jEx.setOptionsValues();

            }

        };
        return {
            init: jEx.init
        };
    };
    window.jExpresscart = $$.jExpresscart;
})(window);
window.expressCart = new jExpresscart();