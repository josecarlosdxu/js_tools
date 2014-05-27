//Module cavaDots
"use strict";
(function (window) {
    $$.jMainNav = function (opts) {
        var jMn = {
            jOpts: $$.extend({}, opts),

         selectAllItems: function() {            
             $('[data-js-mainNavLink]').on('mouseover', function(e){
                var $elem = $(this).parent(),
                bigMenu = $elem.children('.bigMenu'),
                containsBigMenu = bigMenu.length > 0,
                sections = bigMenu.find('[data-js-bigmenu-section]'),
                containsSections = sections.length > 0,
                sectionFirst;
                if(containsBigMenu && containsSections) {
                  sectionFirst = sections[0];
                   addClass(sectionFirst, 'bigMenu-sections-item--selected');
                   sectionFirst.dispatchEvent(new Event('bigMenuSectionChange'));
                }
             });
         },
         init: function () {
            jMn.selectAllItems();           
         }

     };
     return {
        init: jMn.init

    };
};
window.jMainNav = $$.jMainNav;
})(window);

window.mainNav = new jMainNav();
