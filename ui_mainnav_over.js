var mainNav, mainNavOver = (function (window, undefined) {
    var nodeList,
        nodetItem,
        nodeListLen,
        attribute,

        navElem,
        openElem,
        fatherElem,
        bodyTarget,
        body,

        delay = 500,
        delayFade = Math.round(delay / 2),
        timeout = null,

        patternMatch = 'data-js-mainnav',
        attributeValue = 'link',

        setTarget = function (e) {
            bodyTarget = e.target || e.srcElement;
        },

        getTarget = function () {
            var bodyTrg = bodyTarget || null;
            return bodyTrg;
        },

        setElem = function (elem) {
            navElem = elem;
        },

        getElem = function () {
            var navEl = navElem || null;
            return navEl;
        },

        setOpenElem = function (elem) {
            openElem = elem;
        },

        getOpenElem = function () {
            var openEl = openElem || null;
            return openEl;
        },

        setFather = function (elem) {
            fatherElem = elem;
        },

        getFather = function (elem) {
            var fatherEl = fatherElem || null;
            return fatherEl;
        },


        hidePanel = function () {
            removeClass(this, 'mainNav-link--selected');
            $(this.bigMenu).delay(20).fadeOut(delayFade);
            this.active = false;
        },
        showPanel = function () {
            addClass(this, 'mainNav-link--selected');
            bigMenu.init(this.bigMenu);
            $(this.bigMenu).fadeIn(delayFade);
            addEventHandler(this.father, 'mouseleave', delayedHide);

        },

        checkHide = function () {
            var target = getTarget(),
                hasBigMenu = target.hasBigMenu || false,
                parents = $(target).parents('.bigMenu').length > 0;
            clearTimeout(timeout);
            timeout = null;
            removeEventHandler(body, 'mousemove', setTarget);

            if (hasBigMenu && hasBigMenu.length > 0) {
                toggleState.apply(getTarget());
                return false;
            }
            if (parents) {
                return false;
            }
            if (getFather() && getFather() !== getTarget()) {
                hidePanel.apply(getOpenElem());
            }

        },

        delayedHide = function (e) {
            var target = e.target || e.srcElement;
            setFather(e.target);
            addEventHandler(body, 'mousemove', setTarget);
            timeout = setTimeout(checkHide, delay);
        },




        toggleState = function () {
            this.active = !this.active;
            if (this.active) {
                this.dispatchEvent(eventMainNavChange);
                showPanel.apply(this);
                setOpenElem(this);
                this.active = !this.active;
            }

        },

        checkActive = function (e) {
            var target = e.target || e.srcElement;
            if (getOpenElem() && getOpenElem() !== target) {
                hidePanel.apply(getOpenElem());
            }

        },



        checkShow = function () {
            clearTimeout(timeout);
            timeout = null;
            removeEventHandler(body, 'mousemove', setTarget);
            if (getElem() === getTarget()) {
                if (getElem().hasBigMenu.length === 0) {
                    return false;
                }
                toggleState.apply(getElem());
            }


        },

        delayedShow = function (e) {
            var target = e.target || e.srcElement;
            setElem(target);
            addEventHandler(body, 'mousemove', setTarget);
            timeout = setTimeout(checkShow, delay);
        },



        setListeners = function (elem) {
            elem.father = elem.parentNode;
            elem.bigMenu = elem.father.children[1];
            elem.hasBigMenu = elem.bigMenu && hasClass(elem.bigMenu, 'bigMenu') || [];
            elem.active = false;
            addEventHandler(elem, 'mouseover', delayedShow);


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
            document.addEventListener('mainNavChange', checkActive, true);
        },


        init = function () {
            window.eventMainNavChange = eventBuilder('mainNavChange');
            getElems();
        };
    return {
        init: init
    };

})(window);