
var mobileMenu, 
mobileMenuBtn,
movileMenuScrollHeight,

removeObjListeners = function(elem) {
  elem.removeEventListener('touchstart', setInitTouch, false);
  elem.removeEventListener('touchmove', getTouchMovement, false);
  elem.removeEventListener('touchend', setTouchEnd, false); 
},


setTouchEnd  = function(evt) {
  var elem = evt.currentTarget,
  props = elem.props,
  isClosing = props.isClosing === true,
  time = 0.2,
  easeFunc= Power3.easeOut,
  limit = isClosing ? props.limitHide : props.limitShow;
  elem.props.isOpen = !isClosing;
  if(isClosing) {    
    time = 0.15;
    easeFunc= Power3.easeInOut;
  }
  if(props.onScrollX) {
    TweenLite.to(elem, time, {left:limit,ease:easeFunc});     
  }  
  props.onScrollX = false;


},





moveXElem = function(elem, distx, evt) {

  var props = elem.props,  
  closeLeft = props.closeDir === 'left',
  closeRight = props.closeDir === 'right',

  halfWidth = props.halfWidth,
  limitHide = props.limitHide,
  limitShow = props.limitShow;

  if(closeLeft) {
    halfWidth =  - halfWidth;
    if( distx < limitShow  &&  distx > halfWidth) {
      elem.style.left = distx+ 'px';
      props.isClosing= false;
    } else  if( distx < halfWidth) {
      props.isClosing = true;        
      evt.preventDefault();
      mobileMenuBtn.removeClass('mobileNav-link--pressed');         
      elem.dispatchEvent(new Event('touchend'));      

    }
  }

},



getTouchMovement = function(evt) {
  var elem = evt.currentTarget,
  props = elem.props,
  touchobj = evt.changedTouches[0],
  distx = parseInt(touchobj.clientX) - props.startx,
  rangeX = Math.round(Math.abs(distx));  

  if(rangeX > props.rangex &&  ! props.onScrollY) {
    evt.preventDefault();
    props.onScrollX = true; 
    moveXElem(elem, distx,evt);

  }
},

setInitTouch = function(evt) {
  var elem = evt.currentTarget,
  props = elem.props,
  touchobj = evt.changedTouches[0];
  props.startx = parseInt(touchobj.clientX); 
};








$(function() {

  mobileMenu = $('[data-js ="menu-wrapper"]') [0];
  mobileMenuBtn = $('[data-js="mobileMenu-btn"]');
  movileMenuScrollHeight = screen.height-mobileMenu.offsetHeight;

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


 /* mobileMenu.addEventListener('touchstart',setInitTouch,false);
  mobileMenu.addEventListener('touchmove',getTouchMovement,false);
  mobileMenu.addEventListener('touchend',setTouchEnd,false);*/

  mobileMenuBtn.on('click touchstart', function(evt){    

    $(this).toggleClass('mobileNav-link--pressed');      

    var isOpen = mobileMenu.props.isOpen,
    dest = mobileMenu.props.limitHide;

    if(!isOpen){
      dest = mobileMenu.props.limitShow;
    }

    TweenLite.to(mobileMenu, 0.3, {left:dest,ease:Power2.easeInOut }); 

    mobileMenu.props.isOpen =!isOpen;

    evt.preventDefault();



  });


});