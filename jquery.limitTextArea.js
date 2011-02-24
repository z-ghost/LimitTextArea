/**
 * @author Vitaly Zubchevskiy
 */
(function($) {

	$.fn.limitTextArea = function(options){
		var opts = $.extend({}, $.fn.limitTextArea.defaults, options);

		return this.each(function() {

			var $this = $(this);

			var maxLength = $this.attr(opts.maxLengthAttr);
			var id = $this.attr("id");

			var label = $('<div/>', {
				id : id + opts.labelIdPostfix,
				"class" : opts.labelClass
			}).insertBefore($this);

			function updateLabel()
			{
				var charactersLeft = maxLength - $this.val().length;

				if(charactersLeft < 0)
					charactersLeft = 0;

				label.html(opts.labelContent.replace("{count}", charactersLeft));
			}


			updateLabel();

			$this.keyup(function()
			{
				if($this.val().length >= maxLength)
				{
					// Add the alert class when we have too many chars
					label.addClass(opts.alertClass);
					// Cut down the string
					$this.val($this.val().substr(0, maxLength));
				}
				else
				{
					// Remove the alert class
					if(label.hasClass(opts.alertClass))
						label.removeClass(opts.alertClass);
				}

				updateLabel();
				return false;
			})
			.focusout(function() {label.removeClass(opts.hoverClass)})
			.focusin(function() {label.addClass(opts.hoverClass)});
		});
	};

	$.fn.limitTextArea.defaults = {
	  hoverClass: 'hover',
	  alertClass: 'alert',
	  labelClass: 'textAreaLabel',
	  maxLengthAttr: 'maxlength',
	  labelIdPostfix: 'Limiter',
	  labelContent: 'Осталось {count} символов'
	};


})(jQuery);