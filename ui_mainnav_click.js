var mainNav, mainNavClick = (function (window, undefined) {
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
        elemList = [],

        hideMenu = function () { 
            if(! itemSelected) {
                return false;
            }          
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
                    elemList.push(nodetItem);
                    setListeners(nodetItem);
                }
                nodeListLen--;
            }
            body = document.body;            
        },
        destroy = function() {
            var elem, bigMenu;
             hideMenu();
             nodeListLen = elemList.length - 1;
             while (nodeListLen >= 0) {
                elem = elemList[nodeListLen];
                bigMenu = elem.bigMenu || {};  
                removeEventHandler(bigMenu,'mousedown', checkIsOver);
                removeEventHandler(elem, 'click', showPanel);
                nodeListLen--;
            }
            nodeList = null;
            nodetItem = null;
            nodeListLen = null;
            attribute = null;
            itemSelected = null;
            body = null;
            interval = null;        
            hasBigMenu = null;
            delay = null;    
            isOver = null;    
            patternMatch = null;    
            attributeValue = null; 
            elem = bigMenu =null;
            elemList = null;  
        },

        init = function () {
            getElems();
        };
    return {
        init: init,
        destroy: destroy
    };

})(window);
