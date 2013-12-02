(function($){
    var markSeatSelected = function($seat) {
        var $roomplan = $seat.parents("[data-role='roomplan']");
        $roomplan.find("[data-role='seat']").removeClass("selected");
        $seat.addClass("selected");
    };

    var onSeatClicked = function(event) {
        var options = event.data;

        var $target = $(event.target);
        var $row = $target.parents("[data-role='row']");
        var $roomplan = $target.parents("[data-role='roomplan']");

        var seatId = $target.data("seat");
        var rowId = $row.data("row");

        var seatData = {
            row: options.data.rows[rowId].rownumber,
            seat: seatId + 1,
            category: options.data.rows[rowId].seats[seatId].category,
            price: options.data.rows[rowId].seats[seatId].price
        };

        markSeatSelected($target);
        $roomplan.trigger("seat:clicked", [seatData]);
    };

    var roomplan = function($element, options) {
        $element.html(
            options.template(
                options.data
            )
        );

        $element.on("click.roomplan", "[data-role='seat']", options, onSeatClicked);
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