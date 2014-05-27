//Module cavaDots
var uiBack = (function($) {

    var panel01;
    var panel02;
    var mainNav

    //Module private config vars
    var config = {
    }

    var init = function() {
        var panels = $('.panel .panel-content');
        var panelsContent = $('.panel .panel-content');
        var panelsTitle = $('.panel .panel-title');
        var toolbar = $('.toolbar');
        
        mainNav = $('.mainNav');

        panel01 = $('[data-js-panel-name=panel01]');
        panel02 = $('[data-js-panel-name=panel02]');

        $(window).on('resize', function(){
            var height = $(this).height() - toolbar.outerHeight() - panelsTitle.outerHeight();
            panelsContent.height(height);

        }).trigger('resize');
        

        panels.on('click',function() {

            if ($(this).data('jsPanelState') == 'inactive') {
                //Desactivo el panel anterior visualmente
                $('[data-js-panel-state=active]').toggleClass('panel--inactive').toggleClass('panel--active');
                $('[data-js-panel-state=active]').attr('data-js-panel-state','inactive');

                //y pongo el actual como activo
                $(this).toggleClass('panel--active').toggleClass('panel--inactive');
                $(this).attr('data-js-panel-state','active');
            }            
        });

    }

    var revealPanel = function() {

        $(panel01).toggleClass('panel--active').toggleClass('panel--inactive');
        $(panel02).toggleClass('panel--active panel--secondary--reveal').toggleClass('panel--inactive');
        
        $(panel02).attr('data-js-panel-state','active');
        //$(panel01).attr('data-js-panel-state','inactive');

    }

    var expandMenu = function() {
        $(mainNav).css('width','18rem');
        //$('.content').css('margin-left','18rem');

    }

    //public API

    return {
    //sets to public scope
    init        : init,
    revealPanel : revealPanel,
    expandMenu : expandMenu
    }



})(jQuery);

// Document ready init
$(uiBack.init);