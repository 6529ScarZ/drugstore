(function($) {
  $.extend({
    spin: function(spin, options) {
    	if (options === undefined) {
    		options = {};
    	}
		// Merge defaults and options, without modifying defaults
		var opts = {
	      lines: 9, // The number of lines to draw
	      length: 1, // The length of each line
	      width: 20, // The line thickness
	      radius: 30, // The radius of the inner circle
	      corners: 1, // Corner roundness (0..1)
	      rotate: 0, // The rotation offset
	      direction: 1, // 1: clockwise, -1: counterclockwise
	      color: '#000', // #rgb or #rrggbb or array of colors
	      speed: 1, // Rounds per second
	      trail: 56, // Afterglow percentage
	      shadow: false, // Whether to render a shadow
	      hwaccel: false, // Whether to use hardware acceleration
	      className: 'spinner', // The CSS class to assign to the spinner
	      zIndex: 2e9, // The z-index (defaults to 2000000000)
	      top: '50%', // Top position relative to parent
	      left: '50%', // Left position relative to parent
	      timeout: 30, // default timeout 
	      timeoutTitle: "เธเธดเธ”เธเธฅเธฒเธ”",
	      timeoutMessage : "connection timeout",
	    };
	
		$.extend( true, opts, options );

      var data = $('body').data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
        $("#spinner_modal").remove();
        // return this;
      }
      setTimeout(() => {
    	  var data = $('body').data();
    	  data.spinner.stop();
          delete data.spinner;
          $("#spinner_modal").remove();
          
          // required bootstrap3-dialog
          BootstrapDialog.show({
      		title : opts.timeoutTitle,
      		type : BootstrapDialog.TYPE_DANGER,
      		draggable : true,
      		message :  opts.timeoutMessage,
      		buttons : [ {
      			hotkey : VK_ENTER,
      			label : 'เธเธดเธ”',
      			action : function(dialogRef) {
      				dialogRef.close();
      			}
      		} ]
      	});
	}, opts.timeout * 1000);
      console.log("spin : " + spin);
      if (spin) {

        var spinElem = this;
        var div = '';
        div += '<div id="spinner_modal" ';
        div += '	style="background-color: rgba(0, 0, 0, 0.3); ';
        div += '		width:100%; height:100%; ';
        div += '		position:fixed; top:0px; ';
        div += '		left:0px; z-index:' + (opts.zIndex - 1) + '"';
        div += '/>'
        $('body').append(div);
        spinElem = $("#spinner_modal")[0];

        data.spinner = new Spinner($.extend({
          color: $('body').css('color')
        }, opts)).spin(spinElem);
      }

    }
  });
})(jQuery);