var popup = (function (window, undefined) {
    "use strict";
    var urlPopup,
        popupElem,
        popupCloseBtn,
        popupSubmitBtn,

        newEventPopupLoading,
        newEventPopupLoaded,

        popupBg,
        popupBgPattern = '.popup-container',
        popupBgCursorClassname = 'popup-container--cursor',

        pattern = 'data-js-popup',
        popupMatch = '[' + pattern + '="popup"]',
        btnMatch = '[' + pattern + '="close"]',
        submitMatch = '[' + pattern + '="submitAction"]',

        actionPopup = function (e) {
            e.preventDefault();

        },
        closePopup = function (e) {
            var target = e.target || e.srcElement,
                parents = $(target).parents(popupMatch),
                isPopupTarget = parents.length > 0;
                e.preventDefault();

            if (target === popupCloseBtn || !isPopupTarget) {
                removeEventHandler(popupBg, 'click', closePopup);
                removeClass(popupBg, popupBgCursorClassname);
                document.documentElement.dispatchEvent(newEventPopupLoaded); // para cerrar el loading
            }

        },

        setListeners = function () {
            popupCloseBtn = popupElem.querySelector(btnMatch);
            popupSubmitBtn = popupElem.querySelector(submitMatch);
            addEventHandler(popupCloseBtn, 'click', closePopup);
            addEventHandler(popupSubmitBtn, 'click', actionPopup);
            popupBg = document.querySelector(popupBgPattern);
            addClass(popupBg, popupBgCursorClassname);
            addEventHandler(popupBg, 'click', closePopup);

        },

        setPopup = function (popupElem) {

            var replaceEvent = new CustomEvent('replace');
            newEventPopupLoading = loading.setLoadingEvent(popupElem);
            newEventPopupLoaded = loading.setLoadedEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(replaceEvent);
            setListeners();
        },

        getPopup = function (url) {
            var eventPopupLoading = loading.setLoadingEvent();
            urlPopup = url;
            document.documentElement.dispatchEvent(eventPopupLoading);
            // para iniciar el loading
            $('<div/>').load(urlPopup, function () {
                popupElem = $(this).children()[0];
                setPopup(popupElem);
            });

        };

    return {
        getPopup: getPopup,
        setPopup: setPopup
    }

})(window);