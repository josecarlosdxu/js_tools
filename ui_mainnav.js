var mainNavClick = (function (window, undefined) {
    "use strict";
    var nodeList,
        nodetItem,
        nodeListLen,
        attribute,
        itemSelected,
        body,
        interval,        
        hasBigMenu,
        delay = 200,
        isOver,
        patternMatch = 'data-js-mainnav', 
        attributeValue = 'link',
        hideMenu = function () {            
            itemSelected.bigMenu.removeAttribute('style');
            removeClass(itemSelected, 'mainNav-link--selected');
        },
        showMenu = function (elem) {
            elem.bigMenu.style.display = 'block';
            bigMenu.init(elem.bigMenu);
            addClass(elem, 'mainNav-link--selected');
            itemSelected = elem; 
        },

        resetOver = function () {            
                clearTimeout(interval);
                addEventHandler(body, 'mouseup', checkIsOver);
                isOver = false;
                interval = null; 
        },

        checkIsOver = function (e) { 
            e.preventDefault();
            isOver = e.type ==='mousedown';            
            if(isOver) {
                 removeEventHandler(body, 'mouseup', checkIsOver);
                 interval = setTimeout(resetOver , delay); 
                 return;            
            }
            hideMenu(); 
        },
       
        showPanel = function (evt) {
            var elem = evt.target;          
            addEventHandler(body, 'mouseup', checkIsOver);         
            showMenu(elem);
        },

        stopEvt = function(e) {
           e.preventDefault();
        },

        setListeners = function (elem) {
            elem.father = elem.parentNode;
            elem.bigMenu = elem.father.children[1];
            hasBigMenu = elem.bigMenu && hasClass(elem.bigMenu, 'bigMenu');
            if (hasBigMenu) {
                addEventHandler(elem, 'click', showPanel);
                addEventHandler(elem.bigMenu,'mousedown', checkIsOver);
            }
        },
        getElems = function () {
            nodeList = document.querySelectorAll('[' + patternMatch + ']');
            nodeListLen = nodeList.length - 1;
            while (nodeListLen >= 0) {
                nodetItem = nodeList[nodeListLen];
                attribute = nodetItem.getAttribute(patternMatch) === attributeValue;
                if (attribute) {
                    setListeners(nodetItem);
                }
                nodeListLen--;
            }
            body = document.body;            
        },
        init = function () {
            getElems();
        };
    return {
        init: init
    };

})(window);
