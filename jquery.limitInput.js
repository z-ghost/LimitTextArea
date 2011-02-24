/**
 * @author Vitaly Zubchevskiy
 */
(function($) {

$.fn.extend({
    limitInput : function(){

        return this.each(function(index) {
            var $this = $(this);

            var maxLength = $this.attr("maxlength");
            var id = $this.attr("id");

            var label = $('<div/>', {
                id : id + "Limiter",
                "class" : "asrbLimiter"
            }).insertBefore($this);

            function updateLabel()
            {
                var charactersLeft = maxLength - $this.val().length;

                if(charactersLeft < 0)
                    charactersLeft = 0;

                label.html("Осталось " + charactersLeft + " символов");
            }


            updateLabel();

            $this.keyup(function()
            {
                if($this.val().length >= maxLength)
                {
                    // Add the notification class when we have too many chars
                    label.addClass("notification");
                    // Cut down the string
                    $this.val($this.val().substr(0, maxLength));
                }
                else
                {
                    // Remove the notification class
                    if(label.hasClass("notification"))
                        label.removeClass("notification");
                }

                updateLabel();
                return false;
            })
            .focusout(function() {label.removeClass("hover")})
            .focusin(function() {label.addClass("hover")});
        });
    }
});

})(jQuery);