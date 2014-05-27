$(function() {





	mobileMenuLauncher();
	toolbarLanguages.init();
	expressCart.init();
	loading.init();

	scrollTop.init();

	uiTooltip.init();

	//function toggleMainNav() {
		/*mainNav = mainNavClick;

		mainNav.init();
		mainNav.destroy();*/


		mainNav = mainNavOver;

		mainNav.init();

		//function trazaPopup(e) {

			//console.log(e)



		//}



		 //addEventHandler(document.documentElement, 'replace', trazaPopup);






	//}




    //toggleMainNav();



  /* var jsonString = document.querySelector('[data-js-validate]').getAttribute('data-js-validate');

   if(jsonString) {

   	 var jsonObj = JSON.parse(jsonString.replace(/'/g, '"'));

     console.log(jsonObj);

   }*/
















	$('[data-js-login="loginBtn"]').on('click',function(){
		popup.getPopup('../../views/front/partials/popup.html');
	});



	$('[data-js-select="order"]').on('change',function(){

		var dest = $('[data-js-anchor="productList"]')[0],
		eventLoading = loading.setLoadingEvent(null, dest),
        eventLoaded = loading.setLoadedEvent(eventLoading);

		document.documentElement.dispatchEvent(eventLoading);


          var timeout = setTimeout(function() {
			clearTimeout(timeout);
			timeout = null;
			document.documentElement.dispatchEvent(eventLoaded);
		},2000);








		/*var dest =$('[data-js-anchor="productList"]')[0],
		loadingEvent = cloneEventObj(eventLoading, { 'detail': eventLoading.detail });

		//loadingEvent.detail.container = dest;

		console.log(eventLoading.detail)
		console.log(loadingEvent.__proto__.detail)*/

		//console.log(loading.setLoading())




		//eventLoading.detail.container = $('[data-js-anchor="productList"]')[0];
		//eventLoaded.detail.container = $('[data-js-anchor="productList"]')[0];
		/*document.documentElement.dispatchEvent(eventLoading);
		var timeout = setTimeout(function() {
			clearTimeout(timeout);
			timeout = null;
			//document.documentElement.dispatchEvent(eventLoaded);
		},5000);*/
	});








});
