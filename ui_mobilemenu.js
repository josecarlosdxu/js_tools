var mobileMenuLauncher = function () {

  var mobileMenu = $('[data-js ="menu-wrapper"]') [0],  
  mobileMenuBtn = $('[data-js="mobileMenu-btn"]');

  if( typeof mobileMenu === 'undefined') {
    return false;
  } 

  mobileMenu.props = { 
    startx: 0, 
    starty: 0,
    timer: 0,
    stopy: 0, 
    scrollEase: false, 
    boxTop: 0,
    isClosing:false,
    isOpen:false,
    onScrollY : false,
    onScrollX : false,
    closeDir: 'left',
    rangey: 5,
    rangex: 30,
    limitBottom : 1,
    limitTop: 0 - ($('[data-js="gn-menu"]')[0].offsetHeight -(screen.height-80)),
    halfWidth: mobileMenu.offsetWidth / 2,
    limitHide: 0 - mobileMenu.offsetWidth,
    limitShow: 0
  }; 

  if (navigator.userAgent.match(/ Chrome/i)) {
    mobileMenu.props.rangex = 7;
  } 

  mobileMenuBtn.on('click touchstart', function(evt){  
    var isOpen = mobileMenu.props.isOpen,
    dest = mobileMenu.props.limitHide; 
    $(this).toggleClass('mobileNav-link--pressed');  

    if(!isOpen){
      dest = mobileMenu.props.limitShow;
    }

    TweenLite.to(mobileMenu, 0.3, {left:dest,ease:Power2.easeInOut });
    mobileMenu.props.isOpen =!isOpen;
    evt.preventDefault();
  });


};