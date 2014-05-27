var expressCart = (function (window, undefined) {
    "use strict";
    var cartBtn,
        cartPanel,
        body,
        patternMatch = 'data-js-expresscart',
        patternCart = 'expresscart',
        patternBtn = 'toolbar-expresscart-btn',

        showPanelClassname = 'expresscart--show',
        showBtnClassname = 'toolbar-item--active',

        closePanel = function () {
            removeClass(cartPanel, showPanelClassname);
            removeClass(cartBtn, showBtnClassname);
            removeEventHandler(body, 'mouseup', checkIsOver);
            addEventHandler(cartBtn, 'click', showPanel);
        },

        checkIsOver = function (e) {
            var target = e.target || e.srcElement,
                $target = $(target),
                parents = $target.parents('[' + patternMatch + '="' + patternCart + '" ]');

            if ($target.parents('.tooltip').length !== 0 || $target.hasClass('tooltip')) {
                return false;
            }
            if (parents.length === 0) {
                closePanel();
            }
            if (target === cartBtn) {
                closePanel();
            }


        },
        showPanel = function (e) {
            e.preventDefault();
            addClass(cartBtn, showBtnClassname);
            addClass(cartPanel, showPanelClassname);
            addEventHandler(body, 'mouseup', checkIsOver);
            removeEventHandler(cartBtn, 'click', closePanel);
        },

        getElems = function () {
            cartPanel = document.querySelector('[' + patternMatch + '="' + patternCart + '"]');
            cartBtn = document.querySelector('[' + patternMatch + '="' + patternBtn + '"]');
            if (!cartBtn) {

                return false;
            }
            body = document.body;
            addEventHandler(cartBtn, 'click', showPanel);


        },
        init = function () {
            getElems();
        };

    return {
        init: init
    }

})(window);