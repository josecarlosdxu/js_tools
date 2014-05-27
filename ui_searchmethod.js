var searchMethod = (function (window, undefined) {
    var nodeList = {},       
        patternMatch = 'data-js-search',
        searchField,
        searchButton,
        searchBox,
        objects = {
            searchField: null,
            searchBox: null,
            searchButton: null
        },
        toggleMethodList = [addClass, removeClass],
        toggleMethod,
        showClassname = 'searchBox--show',
        isShow = true,
        attribute,
        nodetItem,
        elementItem,

        toggleSearchBox = function () {
            isShow = !isShow;
            toggleMethod = toggleMethodList[Number(isShow)];
            toggleMethod(searchBox, showClassname);
        },

        setListeners = function () {

            searchButton = objects.searchButton;
            searchBox = objects.searchBox;
            searchField = objects.searchField;

            addEventHandler(searchButton, 'click', toggleSearchBox);

        },

        getElems = function () {
            nodeList = document.querySelectorAll('[' + patternMatch + ']');
            for (var x = 0; nodetItem = nodeList[x]; x++) {
                attribute = nodetItem.getAttribute(patternMatch);
                elementItem = objects[attribute] = nodetItem;
            }
            setListeners();
        },

        init = function () {
            getElems();
        };
    return {
        init: init
    }

})(window);