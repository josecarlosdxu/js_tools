///
///     uso
///
///     var destino =  document.querySelector(pattern),
///     div = document.createElement('div'),
///     eventLoading = loading.setLoadingEvent(null, destino) --> param [0] = elemento a añadir / reemplazar
///     -----------------------------------------------------> si es  null se pone la capa de animación del loading
///
///     newEventLoading = loading.setLoadingEvent(div) --> param [0] = elemento a añadir / reemplazar
///     -------------------------------------------------> param [1] = destino  --> si es null  se añade por defecto al body
///
///     newEventLoaded = loading.setLoadedEvent(newEventLoading) --> param [0] = evento que cierra al despachar
///
///     eventLoaded = loading.setLoadedEvent(eventLoading) --> param [0] = evento que cierra al despachar
///
///     document.documentElement.dispatchEvent(eventLoading);    --> despacha el evento loading nº 1
///     document.documentElement.dispatchEvent(newEventLoading); --> despacha el evento loading nº 2
///     document.documentElement.dispatchEvent(eventLoaded);     --> despacha el evento loaded / cierra el evento loading nº 1

var loading = (function (window, undefined) {
    "use strict";
    var dc,
        body,
        doc,
        eventLoading,
        attributeName = 'data-loading',

        generateIdCont = function(){
            var idCont = Math.round(Math.random()*10000000000);
            return idCont;
        },

        resetLoadingEvt = function() {
             eventLoading = {'detail':{'destination':0,'idCont':0}};
        },


        removeLoadingCont = function(obj) {
             obj.remove();
             resetLoadingEvt();
        },

        loadingClose = function (e) {
            var detail = e.detail,
                idCont = detail.idCont,
                pattern = '[' + attributeName + '="' + idCont + '"]',
                containerObj = document.querySelector(pattern);
            if (containerObj) {
                removeLoadingCont(containerObj);
            }

        },

        loadingShow = function (e) {
            var detail = e.detail,
                destination = detail.destination,
                bgContainer = detail.bgContainer;
            bgContainer.removeAttribute('style');
            destination.appendChild(bgContainer);

        },

        createContainers = function (e) {
            var detail = e.detail,
                contentObj = detail.contentObj,
                destination = detail.destination,

                loadingBg = createNewElem('popup-container'),
                loadingGrid = createNewElem('modularGrid modularGrid--boxed'),
                loadingMod = createNewElem('modularGrid-module');

            loadingMod.appendChild(contentObj);
            loadingGrid.appendChild(loadingMod);
            loadingBg.appendChild(loadingGrid);

            loadingBg.setAttribute(attributeName, e.detail.idCont);

             if (destination !== body) {
                addClass(loadingBg, 'popup-container--inside');

            }
            e.detail.elemContainer = loadingMod;
            e.detail.bgContainer = loadingBg;

        },


        replaceContent = function(e) {
             var detail =  e.detail,
                contentObj = detail.contentObj,
                bgContainer = eventLoading.detail.bgContainer,
                elemContainer = eventLoading.detail.elemContainer;

                bgContainer.setAttribute(attributeName, detail.idCont);
                elemContainer.innerHTML="";
                elemContainer.appendChild(contentObj);

                e.detail.elemContainer = elemContainer;
                e.detail.bgContainer = bgContainer;
        },


       checkLoadingState = function (e) {

           var sameDestination,
               loadingDetail = eventLoading.detail,
               detail = e.detail;

           if(loadingDetail.idCont === 0) {   // si no hay loading
               eventLoading = e;
               createContainers(e);
               loadingShow(e);
               return;
           }

           sameDestination = loadingDetail.destination === detail.destination;

           if(sameDestination) {
                replaceContent(e);
           } else {
               createContainers(e);
               loadingShow(e);
           }
           eventLoading = e;
        },

        setLoadingEvent = function (elm, dest) {
            var destination = dest || body,
            elem = elm || createNewElem('loading'),

            evtLoad = new CustomEvent('loading', {
                'detail': {
                    'destination': destination,
                    'contentObj': elem,
                    'idCont':generateIdCont()
                }
            });

            addEventHandler(doc, 'loading', checkLoadingState);
            return evtLoad;
        },

        setLoadedEvent = function (eLoad) {
            var eventLoaded = new CustomEvent('isloaded', {
                'detail': {
                    'idCont': null
                }
            }),
            evtLoad = eLoad  || setLoadingEvent();
            eventLoaded.detail.idCont = evtLoad.detail.idCont;
            addEventHandler(doc, 'isloaded', loadingClose);
            return eventLoaded;
        },
       setValues = function () {
            dc = document;
            body = dc.body;
            doc = dc.documentElement;
            resetLoadingEvt();
        },

        init = function () {
            setValues();
        };
    return {
        init: init,
        setLoadingEvent: setLoadingEvent,
        setLoadedEvent: setLoadedEvent

    };

})(window);




