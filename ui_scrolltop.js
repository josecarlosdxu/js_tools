var scrollTop = (function (window, undefined) {
    "use strict";
    var scrolTopBtn,
        pageTop,
        winHeight,
        isTop,
        proportionScroll,
        speedTop = 10,
        maxHeight = 3000,
        fadeDelay = 100,
        scrollSteps = 6,
        patternMatch = '[data-js-scrolltop="button"]',
        showedProcess = false,
        delaycheck = 400,
        scrollToTop = function (e) {
            var interval,
                scrollToTopMethod = function () {
                    window.scrollBy(0, proportionScroll);
                    if (window.pageYOffset === 0) {
                        pageTop = 0;
                        clearInterval(interval);
                        interval = null;
                        showedProcess = false;
                        addEventHandler(window, 'scroll', checkScrollTop);
                    }

                };

            fadeDown(scrolTopBtn,fadeDelay);
            e.preventDefault();
            removeEventHandler(window, 'scroll', checkScrollTop);

            if(window.pageYOffset > maxHeight) {
                window.scrollBy(0,-window.pageYOffset);
                showedProcess = false;
                addEventHandler(window, 'scroll', checkScrollTop);
                return;
            }
            proportionScroll = 0 - Math.round( window.pageYOffset / scrollSteps);
            interval = setInterval(scrollToTopMethod, speedTop);


        },

        checkScrollTop = function () {
            var timeout = setTimeout(function () {
                pageTop = window.pageYOffset;
                winHeight = window.innerHeight;
                isTop = pageTop > winHeight / 2;
                if (isTop) {
                    fadeUp(scrolTopBtn,fadeDelay);
                } else {
                    fadeDown(scrolTopBtn,fadeDelay);
                }
                addEventHandler(window, 'scroll', checkScrollTop);
                clearTimeout(timeout);
                timeout = null;
            }, delaycheck);
            removeEventHandler(window, 'scroll', checkScrollTop);
        },


        setListeners = function () {
            addEventHandler(scrolTopBtn, 'click', scrollToTop);
            addEventHandler(window, 'scroll', checkScrollTop);
            checkScrollTop();

        },

        getBtn = function () {
            scrolTopBtn = document.querySelector(patternMatch);
            if (!scrolTopBtn) {
                return false;
            }

            setListeners();
        },
        init = function () {
            getBtn();
        };

    return {
        init: init
    }

})(window);