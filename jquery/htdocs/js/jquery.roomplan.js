(function($){
    var roomplan = function($element, options) {
        $element.html(
            options.template(
                options.data
            )
        );
    };

    var pluginFn = jQuery.fn.roomplan = function(options) {
        options = $.extend({}, pluginFn.options, options);

        return this.each(function(index, element) {
            roomplan($(element), options);
        });
    };

    pluginFn.options = {
        template: function() {},
        data: {rows: []}
    };
})(jQuery);