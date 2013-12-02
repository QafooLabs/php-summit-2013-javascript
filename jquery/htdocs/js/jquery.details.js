(function($){
    var onRoomplanSeatSelected = function(event, seatData) {
        var data = event.data;
        data.container.each(function() {
            var $target = $(this);
            $target.html(
                data.options.template(seatData)
            );
        });
    };

    var pluginFn = $.fn.details = function(options) {
        options = $.extend({}, pluginFn.options, options);

        var data = {
            container: $(this),
            options: options
        };

        options.roomplan.on("seat:clicked", data, onRoomplanSeatSelected);
        return this;
    };

    pluginFn.options = {
        template: function() {},
        roomplan: $(document)
    };
})(jQuery);