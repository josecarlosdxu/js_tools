/*var delayNav = 500,
delayHide = 100,
itemActive = null, 
bigMenuActive,
overEvt,
targetEvt;

function showMainNavBigmenu() {

bigMenuActive.fadeIn(200, function() { 
    $(this).addClass('bigMenu--active');	
});

}

function hideMainNavBigmenu() {
	$('[data-js="bigMenu"]').fadeOut().removeClass('bigMenu--active');
	
	
}

function setItemActive($elem) {
	itemActive = $elem;
	bigMenuActive = $elem[0].itemBigMenu;
	showMainNavBigmenu(); 
}


function checkItemActive(evt) {
	var $elem = $(evt.target);

	if(itemActive === null) {
		setItemActive($elem);		
	}

	if(itemActive !== $elem) {		
		$('[data-js="mainNav-link"]').off('mouseover');  
		 var timeOutBigMenu = setTimeout(function(){ 

		 if(itemActive !== $elem) {
		 	setItemActive($elem); 
		 }
		 $('[data-js="mainNav-link"]').on('mouseover',checkItemActive);  
		 clearTimeout(timeOutBigMenu);
		 },delayNav);
	}
	evt.preventDefault();
	evt.stopPropagation();
}


function setMainNavItemsProps($item) {
	var item = $item[0];    
	item.itemBigMenu = $item.next('[data-js="bigMenu"]');
	item.timeOut;
	$item.off('mouseover').on('mouseover',checkItemActive); 
}


function checkMainNavLink(evt) {	
    $('body').off('mousemove');
    var timeOutMainNav = setTimeout(function(){       		
       		clearTimeout(timeOutMainNav);
       		$('body').on('mousemove', function(evt) { 
       			var target = $(evt.target),
       		    isMainNavLink = target.attr('data-js') ==='mainNav-link' ||  target.parents('[data-js="mainNav-item"]').length > 0; 
       		    if(!isMainNavLink) {
       		    	itemActive = null; 
       		    	hideMainNavBigmenu();       		    	      		    	
       		    } 
       			$('body').off('mousemove').on('mousemove', checkMainNavLink);
       		});       		
       	},delayHide);
    evt.preventDefault();
	evt.stopPropagation();
}

$('body').on('mousemove', checkMainNavLink);


$('[data-js="mainNav-hidelink"]').off('mouseover').on('mouseover',function(evt){
	itemActive = null;
	hideMainNavBigmenu();	
	evt.preventDefault();
	evt.stopPropagation();	
}); 


$('[data-js="mainNav-link"]').each(function() {
    setMainNavItemsProps($(this));
});





/*



function setMainNavOver($elem) {
	var elem = $elem[0];
	timeOutMainNav = setTimeout(function() {
		clearTimeout(timeOutMainNav);
		if(itemActive === elem){
			showMainNavBigmenu(elem.itemBigMenu);		  
		}
	}, delayNav);
	itemActive = elem;	
} 

/*function setMainNavOut() {
	var target = $(overEvt.target),
	targetParent = target.parent('[data-js="mainNav-item"]'),
	isMainNavItem = targetParent.length > 0;
    if(!isMainNavItem) {
    	hideMainNavBigmenu();	
	}
    
	
} */


/*function setMainNavEvents($item) { 
    $item.off('mouseover').on('mouseover',	function(evt) {
    		clearTimeout(timeOutMainNav);
    		setMainNavOver($item);
    		evt.preventDefault();
    		evt.stopPropagation();
    	});

     /*$item.off('mouseout').on('mouseout',	function(evt) {
    		timeOutMainNav = setTimeout(function(){
    			clearTimeout(timeOutMainNav);

                console.log(itemActive)

    			//if(!itemActive){
    				//alert('nooooo')
    			//}

    		},delayNav);
    		
    	});*/

    /*$('.mainNav').on('mouseover mouseout', function() {
    	
       	timeOutMainNav = setTimeout(function(){

       		console.log(itemActive)
       		clearTimeout(timeOutMainNav);
       		/*if(itemActive){
               $('.mainNav-menu').off('mouseover mouseout');
       		}else{

       		}*/
/*
       		},delayHide);
    });

} */


/*


/**/


	
	


	
	


	
   









