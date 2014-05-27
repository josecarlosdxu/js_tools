var uiTooltip = (function (window, undefined) {
    "use strict";
    var tooltipUiElem,
        tooltipUiContent,
        tooltipUiClose,
        tooltipObj,
        tooltipUrl,
        tooltipMessage,
        tooltipClass,
        tooltipOptionalClasses,
        selectorsList,
        selectorsLen,
        selector,
        body,
        tooltipList,
        position,
        isLoadingContent = false,
        fadeDelay = 100,
        marginTooltip = 10,
        classModifierPrefix = 'tooltip--',
        attributeName = 'data-js-tooltip',
        selectorsPattern = '[' + attributeName + ']',

        resetTooltip = function () {
            tooltipUiElem.removeAttribute('style');
            tooltipUiContent.innerHTML = '';
            removeClass(tooltipUiElem, tooltipUiElem.modifierClass);
        },

        closeTooltip = function (e) {
            var hasAttribute,
            target = e.target || e.srcElement,
            typeEvt = e.type,
            targetParent = target.parentNode || body;
            if(typeEvt ==='scroll') {
                target = body;
             }
            hasAttribute = targetParent.getAttribute(attributeName) || target.getAttribute(attributeName);
            e.preventDefault();
            e.stopPropagation();
            if( hasAttribute) {
                return false;
            }
            removeEventHandler(body, 'mouseup', closeTooltip);
            removeEventHandler( window, 'scroll', closeTooltip);
            fadeDown(tooltipUiElem, fadeDelay, resetTooltip);

        },

        setTooltipPosition = function () {
            var elemLeft,
            elemTop,
            elemWidth = tooltipUiElem.offsetWidth,
            halfWidth = elemWidth / 2 ,
            elemHeight = tooltipUiElem.offsetHeight;

             switch (tooltipObj.modifier) {
                case 'top':
                    elemTop = (position.top - marginTooltip) + window.pageYOffset;
                    elemTop -= elemHeight;
                    elemLeft = position.left + marginTooltip;
                    elemLeft -= halfWidth;
                    break;
                case 'topleft':
                    elemTop = (position.top - marginTooltip) + window.pageYOffset;
                    elemTop -= elemHeight;
                    elemLeft = position.left - 25;
                    break;
                case 'topright':
                    elemTop = (position.top - marginTooltip) + window.pageYOffset;
                    elemTop -= elemHeight;
                    elemLeft = position.left + 35;
                    elemLeft -= elemWidth;
                    break;
                case 'bottom':
                    elemTop =  position.top + window.pageYOffset;
                    elemTop += (marginTooltip * 2.8);
                    elemLeft = position.left + marginTooltip;
                    elemLeft -= halfWidth;
                    break;
                case 'bottomleft':
                    elemTop =  position.top + window.pageYOffset;
                    elemTop += (marginTooltip * 2.8);
                    elemLeft = position.left - 25;
                    break;
                case 'bottomright':
                    elemTop =  position.top + window.pageYOffset;
                    elemTop += (marginTooltip * 2.8);
                    elemLeft = position.left + 35;
                    elemLeft -= elemWidth;
                    break;
            }
            tooltipUiElem.style.top = elemTop + 'px';
            tooltipUiElem.style.left = elemLeft + 'px';
        },

        showTooltip = function () {

            isLoadingContent = false;

            tooltipUiElem.style.opacity = 0;
            tooltipUiElem.style.display = 'block';

            setTooltipPosition();

            fadeUp(tooltipUiElem, fadeDelay);
            addEventHandler(body, 'mouseup', closeTooltip);
            addEventHandler(window, 'scroll', closeTooltip);
        },

        getTooltip = function () {

            if (isLoadingContent || !tooltipMessage && !tooltipUrl) {
                return false;
            }

            isLoadingContent = true;

            if(tooltipMessage) {
               tooltipUiContent.innerHTML = tooltipMessage;
               showTooltip();
               return false;
            }
            $('<div/>').load(tooltipUrl, function () {
                tooltipUiContent.innerHTML = $(this).html();
                showTooltip();
            });
        },

        launchTooltip = function (e) {
            var target = e.currentTarget || e.srcElement,
            idContent = target.idContent;
            position = target.getBoundingClientRect();
            tooltipObj = tooltipList[idContent];
            tooltipUrl = tooltipObj.url || null;
            tooltipMessage = tooltipObj.message || null;
            tooltipOptionalClasses = tooltipObj.optionalClasses || null;
            tooltipClass = classModifierPrefix + tooltipObj.modifier;

            tooltipUiElem.removeAttribute('class');
            addClass(tooltipUiElem, 'tooltip');
            addClass(tooltipUiElem, tooltipClass);

            if(tooltipOptionalClasses) {
                addClass(tooltipUiElem, tooltipOptionalClasses);
            }

            tooltipUiElem.modifierClass = tooltipClass;
            getTooltip();

        },

        createTooltipElem = function () {
            if (tooltipUiElem) {
                return false;
            }
            tooltipUiElem = createNewElem('tooltip');
            tooltipUiContent = createNewElem('tooltip-content');
            tooltipUiClose = createNewElem('tooltip-close icon fa-times', 'i');
            tooltipUiElem.appendChild(tooltipUiClose);
            tooltipUiElem.appendChild(tooltipUiContent);
            body.appendChild(tooltipUiElem);
            tooltipUiElem.modifierClass = null;
        },

        setListeners = function () {
            this.idContent = this.getAttribute(attributeName);
            addEventHandler(this, 'click', launchTooltip);
        },

        getElems = function () {
            selectorsList = document.querySelectorAll(selectorsPattern);
            selectorsLen = selectorsList.length - 1;
            if (selectorsLen < 0) {
                return false;
            }
            while (selectorsLen >= 0) {
                selector = selectorsList[selectorsLen];
                setListeners.apply(selector);
                selectorsLen--;
            }

            body = document.body;
            tooltipList = tooltips;
            createTooltipElem();
        },

        init = function () {
            getElems();
        };
    return {
        init: init
    };

})(window);