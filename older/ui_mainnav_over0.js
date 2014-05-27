/*var mainNav, mainNavOver = (function (window, undefined) {
    var nodeList,
        nodetItem,
        nodeListLen,
        attribute,
        target,
        body,
        delay = 1000,
        capturedLink = null,        
        selectedLink = null, 
        timeout = null,    
        patternMatch = 'data-js-mainnav',
        attributeValue = 'link',



        checkOnBigMenuLeave = function(e) {

            var from = e.relatedTarget ? e.relatedTarget : e.fromElement,
            to = target ? target : e.toElement;

            console.log(from);

            console.log(to);




        },

        checkForShow = function(e) {
            var isSelected;
            if(e) {
                target = e.target;
                e.preventDefault();
                return;
            }
            clearTimeout = timeout;
            timeout = null;
            removeEventHandler(body, 'mouseover', checKForShow);
            isSelected = target === capturedLink;

            if(selectedLink) {
                addEventHandler(selectedLink, 'mouseover', onMouseOver);
                removeClass(selectedLink, 'mainNav-link--selected');                
                selectedLink.bigMenu.removeAttribute('style');
            }

            if(isSelected) {
                removeEventHandler(capturedLink, 'mouseover', onMouseOver);
                addClass(capturedLink, 'mainNav-link--selected');
                capturedLink.bigMenu.style.display = 'block';                
                bigMenu.init(capturedLink.bigMenu);
                selectedLink = capturedLink;
                addEventHandler(capturedLink, 'mouseleave', checkOnBigMenuLeave);
                addEventHandler(capturedLink.bigMenu, 'mouseleave', checkOnBigMenuLeave);
            }
            capturedLink = null;  

        },


        onMouseOver = function(e) {
            /*var target = e.target,
            currentTarget = e.currentTarget,
            from = e.relatedTarget ? e.relatedTarget : e.fromElement,
            to = target ? target : e.toElement;*/
            

           /* if(!capturedLink) {
                capturedLink = e.target;
                addEventHandler(body, 'mouseover', checKForShow);
                timeout = setTimeout(checKForShow, delay);
            }

            
            /*console.log('currentTarget')
            console.log(currentTarget)
            console.log('target')
            console.log(target)*/

            /*console.log(capturedLink)
            console.log(from)
            console.log(to)*/
            



       /* },


         setListeners = function (elem) {
            elem.father = elem.parentNode;
            elem.bigMenu = elem.father.children[1];
            elem.hasBigMenu = elem.bigMenu && hasClass(elem.bigMenu, 'bigMenu');
            if (elem.hasBigMenu) {
                addEventHandler(elem, 'mouseover', onMouseOver);
                //addEventHandler(elem.bigMenu,'click', stopEvt);
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

})(window);*/

var mainNav, mainNavOver = (function (window, undefined) {
    "use strict";
    var nodeList,
        nodetItem,
        nodeListLen,
        attribute,
        hasBigMenu,
        body,
        capturedLink = null,
        oldMenuItem = null,
        newMenuItem = null,
        selectedLink = null,
        inRange = false,
        newMenuItemSelected = false,
        delay = 250,
        timeout = null,
        patternMatch = 'data-js-mainnav',
        attributeValue = 'link',
        timeout = null,


        hideMenu = function () {
          var elem;

            if(selectedLink) {
                /*addEventHandler(selectedLink, 'mouseover', onMouseOver);
                removeClass(selectedLink, 'mainNav-link--selected');                
                selectedLink.bigMenu.removeAttribute('style');*/
          
            elem = selectedLink; 
           
            removeEventHandler(elem.father, 'mouseleave', overInRange);
            removeEventHandler(elem.father, 'mouseover', overInRange);
            elem.bigMenu.removeAttribute('style');
            removeClass(elem, 'mainNav-link--selected');
            addEventHandler(elem, 'mouseover', showPanel); 
            selectedLink = null;
            }           
        },
        showMenu = function (elem) {
            elem.bigMenu.style.display = 'block';
            bigMenu.init(elem.bigMenu);
            addClass(elem, 'mainNav-link--selected');
            addEventHandler(elem.father, 'mouseleave', overInRange);
            addEventHandler(elem.father, 'mouseover', overInRange);
           
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
             evt.preventDefault(); 
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

        overShowRange = function (evt) {
            var evtType = evt.type,
             elem = evt.target;
            evt.preventDefault();             
            inRange = evtType === 'mouseover';
            clearTimeout(timeout);
            timeout = null;
            if (!inRange && !timeout) {                
                timeout = setTimeout(checkStatus, delay);
            }
        },
        checkForShow = function(e) {
            var isSelected, target;
            if(e) {
                target = e.target;
                e.preventDefault();
                return;
            }
            clearTimeout = timeout;
            timeout = null;
            removeEventHandler(body, 'mouseover', checkForShow);
            isSelected = target === capturedLink;

            hideMenu();

            if(isSelected) {
                /*removeEventHandler(capturedLink, 'mouseover', onMouseOver);
                addClass(capturedLink, 'mainNav-link--selected');
                capturedLink.bigMenu.style.display = 'block';                
                bigMenu.init(capturedLink.bigMenu);
                selectedLink = capturedLink;
                addEventHandler(capturedLink, 'mouseleave', checkOnBigMenuLeave);
                addEventHandler(capturedLink.bigMenu, 'mouseleave', checkOnBigMenuLeave);*/
                showMenu(capturedLink);
                selectedLink = capturedLink;
            }
            capturedLink = null;  

        },


        onMouseOver = function(e) { 
            if(!capturedLink) {
                capturedLink = e.target;
                addEventHandler(body, 'mouseover', checkForShow);
                timeout = setTimeout(checkForShow, delay);
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
            evt.preventDefault(); 
            onMouseOver(evt);
            
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
             body = document.body;
        },
        init = function () {
            getElems();
        };
    return {
        init: init
    };

})(window);/**/