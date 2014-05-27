function createObj(obj, target, addOn) {
    "use strict";
    var key,
    newObj,
    contents,
    attrs,
    assignEvt,
    processValues = {
        type: function (val) {
            newObj = document.createElement(val);
        },
        html: function (val) {
            newObj.innerHTML = val;
        },
        contents: function (val) {
            contents = val;
        },
        attr: function (val) {
            attrs = val;
        },
        assignEvt: function (val) {
            assignEvt = val;
        }
    };
    for (key in obj) {
        if (typeof processValues[key] === 'function' && processValues.hasOwnProperty(key)) {
            processValues[key](obj[key]);
        }
    }
    if (addOn !== false) {
        target.appendChild(newObj);
    }
    if (assignEvt) {
        appendEvent(newObj, assignEvt);
    }
    if (attrs && attrs.length > 0) {
        var a = 0,
        len;
        for (len = attrs.length; a < len; a++) {
            newObj.setAttribute(attrs[a].name, attrs[a].value);
        }
        a = len = null;
    }
    if (typeof (contents) === 'object') {
        var i = 0,
        lng;
        for (lng = contents.length; i < lng; i++) {
            createObj(contents[i], newObj);
        }
        i = lng = null;
    }
    return newObj;
}

function iterateObj(obj, trg, addOn) {
"use strict"; //js lint validate ok
var target = trg || document.body,
elem,
key,
elm,
elmChild,
newObj,
elmLength;
for (elem in obj) {
    if (obj.hasOwnProperty(elem)) {
        elm = obj[elem];
        if (typeof (elm) !== 'object') {
            newObj = createObj(obj, target, addOn);
            break;
        }
        elmLength = Object.keys(elm).length;
        if (elmLength > 0) {
            for (key in elm) {
                if (elm.hasOwnProperty(key)) {
                    elmChild = elm[key];
                    if (typeof (elmChild) === 'object') {
                        iterateObj(elmChild, target, addOn);
                    }
                } else {
                    iterateObj(elm, target);
                }
            }
        }
    }
}
return newObj;
}

function mainfunc(object, func, args) {
    this[func].apply(object, args);
}

function appendEvent(elem, objEvt) {
    var evt = objEvt.evt,
    method = objEvt.method,
    args = objEvt.params;
    elem.addEventListener(evt, function () {
        cancelDefaultAction(evt);
        mainfunc(evt, method, args);
    }, false);
}

function eventBuilder(evtType, opts) {
    var evt, evtOpts = opts || {};
    evt = document.createEvent("Event");
    evt.initEvent(evtType, true, true);
    return evt;
}

function checkFieldRequired(field, isMail) {
    var fieldIsOk = field.value !== '';
    if (isMail === true) {
        fieldIsOk = validateEmail(field.value);
    }
    if (fieldIsOk === false) {
        field.setAttribute('placeholder', locale.required_field_error);
        addClass(field, 'error');
    }
    return fieldIsOk;
}


function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}


function removeEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.detachEvent('on' + eventType, handler);
}

function showLoading(evt, elem) {
    if (window[elem].hide) {
        window[elem].hide(true);
    }
    var evento = eventBuilder('loading');
    document.documentElement.dispatchEvent(evento);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


function cancelDefaultAction(e) {
    var evt = e ? e : window.event;
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    if (evt.stopPropagation) evt.stopPropagation();
    evt.returnValue = false;
    return false;
}

function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (ele && hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function removeNode(elem) {
    if(elem.parentNode){
        elem.parentNode.removeChild(elem);
    }
}





function mergeObjects(obj1, obj2) {
    "use strict";
    var obj3 = {};
    for (var attrname in obj1) {
        if (obj1.hasOwnProperty(attrname)) {
            obj3[attrname] = obj1[attrname];
        }
    }
    for (var attr in obj2) {
        if (obj2.hasOwnProperty(attr)) {
            obj3[attr] = obj2[attr];
        }
    }
    return obj3;
}

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function delayedCall(time, callback) {
    var delay = time || 1000,
    timeout = setTimeout(function () {
        clearTimeout(timeout);
        timeout = null;
        callback();
    },
    delay);
}

function getToday(elem, dat) {
    var today,
    date = dat || new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    today = year + "-" + month + "-" + day;
    if (elem) {
        elem.val(today);
        return false;
    } else {
        return today;
    }
}

function setHour(elem) {
    var val,
    dt = new Date();
    hour = dt.getHoursTwoDigits() + ":" + dt.getMinutesTwoDigits();
    if (elem.jquery) {
        elem.val(hour);
        return;
    }
    val = elem.value;
    if (typeof val === 'undefined' || val === '') {
        elem.value = hour;
    }
}

function getElementsByClass(searchClass, node, tag) {
    var classElements = [];
    if (node == null)
        node = document;
    if (tag == null)
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function elemExists(id) {
    return document.getElementById(id);
}

function setObjects(id) {

    var name = id.split('_'),
    len = name.length,
    objName,
    obj = document.getElementById(id);
    if (len > 1) {
        for (var n = 1; n < len; n++) {
            name[n] = capitaliseFirstLetter(name[n]);
        }
    }
    objName = name.join('');
    window[objName] = obj;
}

function classToggle(element, tclass) {
    var classes = element.className;
    classes = hasClass(element, tclass) ? removeClass(element, tclass) : addClass(element, tclass);
}
function toggleClass(element, tclass) {
    var classes;
    if(!element) {
        return false;
    }
    classes = element.className;
    classes = hasClass(element, tclass) ? removeClass(element, tclass) : addClass(element, tclass);
}

function JSONParser(jsonString) {
    var tempString = jsonString.replace(/\'/g, '"'),
    newJSON = $.parseJSON(tempString);
    return newJSON;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUrl(url) {
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
regex = new RegExp(expression);
return url.match(regex);
}

function checkTextareaWidth(formActive) {
    if (!formActive.formObj.image.attr('src')) {
        formActive.formObj.image.parent().removeClass('show');
        $('.js_form_container').removeClass('with_img');
    } else {
        $('.js_form_container').addClass('with_img');

    }

}

Date.prototype.getHoursTwoDigits = function () {
    var retval = this.getHours();
    if (retval < 10) {
        return ("0" + retval.toString());
    } else {
        return retval.toString();
    }
};
Date.prototype.getMinutesTwoDigits = function () {
    var retval = this.getMinutes();
    if (retval < 10) {
        return ("0" + retval.toString());
    } else {
        return retval.toString();
    }
};

function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
//then grab the encoded contents back out.  The div never exists on the page.

    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function urlify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
    title =  'ir al enlace';
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="_blank" title="' + title + '" >' + url + '</a>';
    });
}

function randomNum(lower, upper) {
    var range = upper - lower,
    result = Math.random() * range;
    result = Math.floor(result);
    return parseInt(lower) + result;
}

function windowScrollAdapter() {
    var argsObj = arguments[0],
    scrollTop,
    windowHeight,
    windowHalfHeight,
    elemHeight,
    elemHalfHeight,
    marginTop,
    topPos,
    elem = argsObj.elem,
    delay = argsObj.delay || 300,
    customElem = argsObj.customElem || null,
    customElemId,
    customElemExists,
    checkIsChanged = function () {
        $(document).mousedown();
        $('.hasDatepicker').blur();
        window.onscroll = window.onresize = null;
        intervalScroll = setTimeout(setElemPos, 500);
    },
    setElemPos = function () {
        clearTimeout(intervalScroll);
        intervalScroll = null;
        scrollTop = window.pageYOffset;
        windowHeight = window.innerHeight;
        windowHalfHeight = Math.round(windowHeight / 2);
        elemHeight = elem.scrollHeight;
        if (customElem) {
            customElemId = customElem.getAttribute('id');
            customElemExists = document.getElementById(customElemId);
        }
        customElem = customElemExists;
        if (customElemExists) {
            elemHeight = customElem.scrollHeight;
        }
        elemHalfHeight = Math.round(elemHeight / 2);
        marginTop = (0 - elemHalfHeight) + 'px';
        topPos = (windowHalfHeight + scrollTop) + 'px';
        window.onscroll = window.onresize = null;
        if (elemHeight > windowHeight) {
            marginTop = '20px';
            topPos = 0;
            popupCont.style.minHeight = (elemHeight + 150) + 'px';
            popupCont.style.height = '100%';
        }
        elem.style.marginTop = marginTop;
        elem.style.top = topPos;
        if (elemHeight < windowHeight) {
            popupCont.removeAttribute('style');
            window.onscroll = checkIsChanged;
        }
        window.onresize = checkIsChanged;
        $('.hasDatepicker').blur();
        $(document).mousedown();
        document.documentElement.dispatchEvent(eventResume);
    },
    intervalScroll = setTimeout(setElemPos, delay);
}

function isNumber(event) {
    if (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode !== 9 && charCode !== 8 && charCode !== 46 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && (charCode < 37 || charCode > 38) && (charCode !== 86 || charCode !== 118)) {
            return false;
        }
    }
    return true;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
        );
}

function cloneEventObj(eventObj, overrideObj){

   if(!overrideObj){
      overrideObj = {};
   }
    function EventCloneFactory(overProps){
       for(var x in overProps){
           this[x] = overProps[x];
       }
    }

    EventCloneFactory.prototype = eventObj;

    return new EventCloneFactory(overrideObj);

}


function getElemStyle(elem,prop){
  return window.getComputedStyle(elem).getPropertyValue(prop);
}


function fadeDown (elem) {
   var time = arguments[1] || 200,
   action = arguments[2] || null,
   percent = Math.round(time / 10),
   opacitytyElem = getElemStyle(elem, 'opacity'),
   displayElem = getElemStyle(elem,'display'),
   counter = Number(opacitytyElem),
   interval = null,
   fadeDownMethod = function () {
       elem.style.opacity = counter;
       counter -= 0.1;
       if (counter <= 0) {
           elem.style.opacity = 0;
           elem.style.display='none';
           elem.style.visibility='hidden';
           clearInterval(interval);
           interval = null;
           if(action) {
              action();
           }
       }

   };
   if (displayElem === 'none') {
       return false;
   }
   elem.style.opacity = counter;
   elem.style.display='block';
   elem.style.visibility='visible';
   interval = setInterval(fadeDownMethod, percent);
};

function fadeUp(elem) {
     var time = arguments[1] || 200,
         percent = Math.round(time / 10),
         displayElem = getElemStyle(elem, 'display'),
         visibilityElem = getElemStyle(elem, 'visibility'),
         opacitytyElem = getElemStyle(elem, 'opacity'),
         isElemVisible = false,
         interval = null,
         counter = Number(opacitytyElem),
         fadeUpMethod = function () {
             elem.style.opacity = counter;
             counter += 0.1;
             if (counter >= 1) {
                elem.style.opacity = 1;
                 clearInterval(interval);
                 interval = null;
             }

         };

     isElemVisible = displayElem !== 'none' && opacitytyElem === '1' && visibilityElem === 'visible';
     if (isElemVisible) {
         return false;
     }
     elem.style.opacity = counter;
     elem.style.display='block';
     elem.style.visibility='visible';
     interval = setInterval(fadeUpMethod, percent);
};

function createNewElem(nameClass, typeElm) {
    var type = typeElm || 'div',
    elm = document.createElement(type);
    if(nameClass) {
        addClass(elm, nameClass);
    }
    return elm;
};











function slideToggleTo($btn, $elem, delay, callback) {
    var timeout,
    delay = delay || 200;
    $btn.on('click', function (e) {
        e.preventDefault();
        $elem.slideToggle(delay);
        if (callback) {
            timeout = setTimeout(function () {
                clearTimeout(timeout);
                timeout = null;
                callback();
            }, delay + 100);
        }
    });
}
//polyfill CustomEvent ie9  ie10
(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   };

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();


function EventDispatcher() {}
EventDispatcher.prototype.events = {};
EventDispatcher.prototype.addEventListener = function (key, func) {
    if (!this.events.hasOwnProperty(key)) {
        this.events[key] = [];
    }
    this.events[key].push(func);
};
EventDispatcher.prototype.removeEventListener = function (key, func) {
    if (this.events.hasOwnProperty(key)) {
        for (var i in this.events[key]) {
            if (this.events[key][i] === func) {
                this.events[key].splice(i, 1);
            }
        }
    }
};
EventDispatcher.prototype.dispatchEvent = function (key, dataObj) {
    if (this.events.hasOwnProperty(key)) {
        dataObj = dataObj || {};
        dataObj.currentTarget = this;
        for (var i in this.events[key]) {
            this.events[key][i](dataObj);
        }
    }
};

(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

