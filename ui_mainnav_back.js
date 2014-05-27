var mainNavBack = (function (window, undefined) {
    var nodeList,
        nodetItem,
        nodeListLen,  
        navElem,
     
        body,        
        selectedSection,      

        delay = 500,pCard
        delayFade = Math.round(delay / 2),
        timeout = null,

        patternMatch = 'data-js-mainnavback',

        selectedClassName = 'mainNav-menu-link--selected',     

        setProperties = function () {     
           var linkDirection = this.getAttribute('href');          
           if(window.location.pathname.search(linkDirection) > 0) {
              addClass(this, selectedClassName);
           }


        },


        getElems = function () {
            nodeList = document.querySelectorAll('[' + patternMatch + ']');
            nodeListLen = nodeList.length - 1;
            while (nodeListLen > -1) {
                nodetItem = nodeList[nodeListLen];               
                nodeListLen--;
                setProperties.apply(nodetItem);
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


