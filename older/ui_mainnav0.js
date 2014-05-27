var mainNav = (function (window, undefined) {
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
/*var mainNav = (function (window, undefined) {
    "use strict";
    var nodeList,
        nodetItem,
        nodeListLen,
        attribute,
        hasBigMenu,
        oldMenuItem = null,
        newMenuItem = null,
        inRange = false,
        newMenuItemSelected = false,
        delay = 200,
        timeout = null,
        patternMatch = 'data-js-mainnav',
        attributeValue = 'link',
        hideMenu = function () {
            var elem = oldMenuItem;
            removeEventHandler(elem.father, 'mouseleave', overInRange);
            removeEventHandler(elem.father, 'mouseover', overInRange);
            elem.bigMenu.removeAttribute('style');
            removeClass(elem, 'mainNav-link--selected');
            addEventHandler(elem, 'mouseover', showPanel);
            oldMenuItem = false;
        },
        showMenu = function (elem) {
            elem.bigMenu.style.display = 'block';
            bigMenu.init(elem.bigMenu);
            addClass(elem, 'mainNav-link--selected');
            addEventHandler(elem.father, 'mouseleave', overInRange);
            addEventHandler(elem.father, 'mouseover', overInRange);
            oldMenuItem = elem;
            newMenuItemSelected = false;
            newMenuItem = null;
        },
        checkStatus = function () {
            clearTimeout(timeout);
            timeout = null;
            hideMenu();
            if (newMenuItemSelected) {
                showMenu(newMenuItem);
            }
        },
        overInRange = function (evt) {
            var evtType = evt.type;
            inRange = evtType === 'mouseover';
            clearTimeout(timeout);
            timeout = null;
            if (!inRange && !timeout) {
                timeout = setTimeout(checkStatus, delay);
            }
        },
        checkNewPanel = function (evt) {
            var elem = evt.target,
                evtType = evt.type;
            newMenuItemSelected = evtType === 'mouseover';
            if (newMenuItemSelected) {
                newMenuItem = elem;
            }

        },
        showPanel = function (evt) {
            var elem = evt.target;
            if (oldMenuItem) {
                addEventHandler(elem, 'mouseover', checkNewPanel);
                addEventHandler(elem, 'mouseleave', checkNewPanel);
                checkNewPanel(evt);
                return;
            }
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
                addEventHandler(elem, 'mouseover', showPanel);
                addEventHandler(elem.bigMenu,'click', stopEvt);
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
        },
        init = function () {
            getElems();
        };
    return {
        init: init
    };

})(window);*/