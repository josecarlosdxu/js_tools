  var namespace = {
    mainApp: (function() { // BEGIN iife
      var singleton;
      return function() {
        if (!singleton) {
          singleton = {

          	selectedSection : null,
            getMainApp: function() {
            	return this;
            }
          }
        }
        return singleton;
      };
    }()) // END iife
  };
  // Invoke: namespace.mainApp().amethod()