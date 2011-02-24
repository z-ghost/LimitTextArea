/**
 * @author Vitaly Zubchevskiy
 */
(function($) {

	$.fn.limitTextArea = function(options){
		var opts = $.extend({}, $.fn.limitTextArea.defaults, options);

		return this.each(function() {

			var $this = $(this);

			var maxLength = $this.attr("maxlength");
			var id = $this.attr("id");
			var wasLimitExceeded = false;

			var label = $('<div/>', {
				"class" : opts.labelClass
			}).insertBefore($this);

			function updateLabel()
			{
				var remainingChars = maxLength - $this.val().length;
				
				if(remainingChars < 0)
					remainingChars = 0;

				label.html(opts.labelContent.replace("{count}", remainingChars));
			}
			
			function onChange()
			{
				if($this.val().length >= maxLength)
				{
					label.addClass(opts.alertClass);
					// Cut down the string
					$this.val($this.val().substr(0, maxLength));
					wasLimitExceeded = true;
				}
				else if(wasLimitExceeded)
				{
					label.removeClass(opts.alertClass);
				}

				updateLabel();
				//return false;
			}


			updateLabel();

			$this.keyup(onChange)
				.keydown(onChange)
				.focusout(function() {label.removeClass(opts.hoverClass)})
				.focusin(function() {label.addClass(opts.hoverClass)});
		});
	};

	$.fn.limitTextArea.defaults = {
	  hoverClass: 'hover',
	  alertClass: 'alert',
	  labelClass: 'textAreaLabel',
	  labelContent: '{count} characters left',
	};


})(jQuery);