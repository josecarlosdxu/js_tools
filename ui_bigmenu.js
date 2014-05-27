var bigMenu = (function (window, undefined) {
    "use strict";
    var firstItem,
        itemElem,
        itemList,
        itemListLen,
        newEvent,
        itemSelected,       
        menu,
        panelList,
        panelListLen,
        panelItem,        
        panelPattern = 'data-js-bigmenu-panel',
        patternMatch = '.bigMenu-sections-item--submenu',
        className = 'bigMenu-sections-item--submenu--selected',
        attibuteName = 'data-js-bigmenu-section',
        itemEventType = 'mouseover',

        hidePanel = function (elem) {
            elem.style.display = 'none';
        },

        showPanel = function (elem) {
            elem.removeAttribute('style');
        },

        showSection = function (evt) {
            var elem = evt.target;

            if (itemSelected) {
                removeClass(itemSelected, className);
                hidePanel(itemSelected.panel);
            }

            addClass(elem, className);
            showPanel(elem.panel);
            itemSelected = elem;

        },

        setListeners = function (elem) {
            var idVal = elem.getAttribute(attibuteName);
            elem.panel = menu.querySelector('[' + panelPattern + '="' + idVal + '" ]');
            addEventHandler(elem, itemEventType, showSection);
        },
        getElems = function () {

            itemList = menu.querySelectorAll(patternMatch);
            itemListLen = itemList.length;
            if(itemListLen === 0) {
                return false;
            }
            
            itemListLen -= 1;

            firstItem = itemList[0];

            panelList = menu.querySelectorAll('[' + panelPattern + ']');
            panelListLen = panelList.length - 1;

            while (panelListLen >-1) {

                panelItem = panelList[panelListLen];
                hidePanel(panelItem);
                panelListLen--;
            }

            while (itemListLen >= 0) {
                itemElem = itemList[itemListLen];

                setListeners(itemElem);

                itemListLen--;
            }
            newEvent = eventBuilder(itemEventType);
            firstItem.dispatchEvent(newEvent);
        },

        init = function (elm) {
            menu = elm;
            getElems();
        };

    return {
        init: init

    };

})(window);