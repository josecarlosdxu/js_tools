var uiBack = (function (window, undefined) {

    var panelContent,
        panelContentList,
        len,
        panelTitle,
        toolbar,
        mainNav,

        panel01,
        panel02,

        windowHeight,
        rows,
        toggleTab,
        toggleTabPattern = '[data-js-panel ="toggletab"]',
        panelStateAttr = 'data-js-panel-state',

        setPanelsHeight = function(hgt) {
            len = panelContentList.length - 1;
            while(len > -1) {
                panelContent = panelContentList[len];
                panelContent.style.height = hgt + 'px';
                len--;
            }
        },

        resizeHandler = function (e) {

            var height,

                Timeout = setTimeout(function () {
                    clearTimeout(Timeout);
                    Timeout = null;
                    height = window.innerHeight - toolbar.offsetHeight - panelTitle.offsetHeight;
                    setPanelsHeight(height);

                    addEventHandler(window, 'resize', resizeHandler);
                }, 500);

            removeEventHandler(window, 'resize', resizeHandler);
        },

        expandMenu = function (e) {
            mainNav.style.width = '18rem';

        },

        hidePanel = function (e) {
            var Timeout = setTimeout(function () {
                clearTimeout(Timeout);
                Timeout = null;
                toggleClass(panel02, 'panel--active');
                toggleClass(panel02, 'panel--inactive');
            }, 1100);

            toggleClass(panel01, 'panel--active');
            toggleClass(panel01, 'panel--inactive');
            toggleClass(panel02, 'panel--secondary--reveal');
            removeEventHandler(panel01, 'click', hidePanel);
        },


        selectRow = function(elem) {

            var check, elemTr = elem.parentNode;

            if (hasClass(elem, 'form-checkbox')) {
                elemTr = elemTr.parentNode;


            } else {

                check = elem.children[0]

              check.checked =! check.checked;



            }

          toggleClass(elemTr, 'table-tr--selected');



        },

        revealPanel = function (e) {
            var elem = e.target;

            //console.log('target  --- '+e.target);
            //console.log('currentTarget  --- '+e.currentTarget);

            if (hasClass(elem, 'form-checkbox') || hasClass(elem,'table-item--checkbox')) {
                selectRow(elem);
                return;
            }

            toggleClass(panel01, 'panel--active');
            toggleClass(panel01, 'panel--inactive');
            toggleClass(panel02, 'panel--inactive');
            toggleClass(panel02, 'panel--active panel--secondary--reveal');

            panel02.setAttribute('data-js-panel-state', 'active');
            panel02.setAttribute('data-js-panel-state', 'inactive');




            e.preventDefault();

            var Timeout = setTimeout(function () {
                clearTimeout(Timeout);
                Timeout = null;
                addEventHandler(panel01, 'click', hidePanel);

            }, 1100);
        },

        setListeners = function (nodeList, evtType, method) {
            var len = nodeList.length - 1,
                elem;
            while (len >= 0) {
                elem = nodeList[len];
                addEventHandler(elem, evtType, method);
                len--;
            }
        },

        setPanelState = function (panel) {
            if(!panel) {
                return;
            }

            panel.state = panel.getAttribute(panelStateAttr);
        },

        setElems = function () {
            panelContentList = document.querySelectorAll('.panel .panel-content');
            panelTitle = document.querySelector('.panel .panel-title');
            toolbar = document.querySelector('.toolbar');
            mainNav = document.querySelector('.mainNav');
            panel01 = document.querySelector('[data-js-panel-name="panel01"]');
            panel02 = document.querySelector('[data-js-panel-name="panel02"]');
            rows = document.querySelectorAll('[data-js-back="row"]');



            setPanelState(panel01);
            setPanelState(panel02);
            toggleTab = document.querySelector(toggleTabPattern);

            if (toggleTab) {
                addEventHandler(toggleTab, 'click', hidePanel);

            } else {
                console.log('no hay toggleTab')
            }
            addEventHandler(window, 'resize', resizeHandler);
            addEventHandler(mainNav, 'click', expandMenu);

            resizeHandler();

            if(!panel02) {
                return false;
            }

            setListeners(rows, 'click', revealPanel);
        },

        init = function () {
            setElems();
        };

    return {

        init: init
    };



})(window);