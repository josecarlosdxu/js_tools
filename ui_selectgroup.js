var selectGroup = (function (window, undefined) {
    "use strict";
    var selectBtnList,
        selectPanel,
        btnActive,
        body,

        patternMatch = 'data-js-selectgroup',

        patternBtn = 'button',
        patternPanel = 'panel',

        showBtnClassname = 'selectGroup-button--active',
        showPanelClassname = 'selectGroup-panel--active',

        closePanel = function () {
            removeClass(btnActive, showBtnClassname);
            removeClass(selectPanel,showPanelClassname);
        },

        checkIsOver = function (e) {
            var target = e.target || e.srcElement,
                $target = $(target),
                parents = $target.parents('.selectGroup');


            if (parents.length === 0) {
                closePanel();
            }



        },
        showPanel = function (e) {
            var target = e.currentTarget || e.srcElement;

            target.parentNode.appendChild(selectPanel);
            e.preventDefault();

            if( btnActive && btnActive !== target) {
                closePanel();
            }

            btnActive = target;
            toggleClass(target, showBtnClassname);
            toggleClass(selectPanel, showPanelClassname);






            /*addClass(cartBtn, showBtnClassname);
            addClass(cartPanel, showPanelClassname);
            addEventHandler(body, 'mouseup', checkIsOver);
            removeEventHandler(cartBtn, 'click', closePanel);*/

        },

        getElems = function () {
            var len, selectBtn, i =0;
            selectBtnList = document.querySelectorAll('[' + patternMatch + '="' + patternBtn + '"]');
            selectPanel = document.querySelector('[' + patternMatch + '="' + patternPanel + '"]');
            len = selectBtnList.length;

            if (len < 1 ) {
                return false;
            }

            for(i; i<len ;i++) {
                selectBtn = selectBtnList[i];
                addEventHandler(selectBtn, 'click', showPanel);
            }

            i = null;
            body = document.body;
            addEventHandler(body, 'mouseup', checkIsOver);
        },
        init = function () {
            getElems();
        };

    return {
        init: init
    }

})(window);