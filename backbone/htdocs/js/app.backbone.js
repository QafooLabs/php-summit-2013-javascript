var annotateRoomplan = function(roomplan) {
    return {
        "rows": roomplan.rows.map(function(row, rowIndex) {
            return {
                "rownumber": row.rownumber,
                "seats": row.seats.map(function(seat, seatIndex) {
                    seat.row = rowIndex;
                    seat.seat = seatIndex;
                    return seat;
                })
            };
        })
    };
};

var LocatorApp = new Backbone.Marionette.Application();

LocatorApp.addRegions({
    roomplan: '#roomplan-region',
    details: '#details-region'
});

var RelationalModel = Backbone.Model.extend({
    relations: {},

    parse: function(response){
        var key;

        for(key in this.relations)
        {
            var relationClass = this.relations[key];
            var relationData = response[key];
            response[key] = new relationClass(
                relationData,
                {parse:true}
            );
        }
        return response;
    }
});

var SeatModel = Backbone.Model.extend({
    defaults: {
        seat: -1,
        row: -1,
        category: "normal",
        price: 10.0,
        taken: false
    }
});

var SeatCollection = Backbone.Collection.extend({
    model: SeatModel
});

var RowModel = RelationalModel.extend({
    relations: {
        seats: SeatCollection
    },
    defaults: {
        rownumber: "n/a",
        seats: []
    }
});

var RowCollection = Backbone.Collection.extend({
    model: RowModel,
    url: "data/roomplan.json",
    parse: function(response) {
        return annotateRoomplan(response).rows;
    }
});

var SeatView = Backbone.Marionette.ItemView.extend({
    template: '#template-seat'
});

var RowView = Backbone.Marionette.CompositeView.extend({
    template: "#template-row",
    itemView: SeatView,
    itemViewContainer: "[data-role='seats']",
    initialize: function() {
        this.collection = this.model.get("seats");
    }
});

var RoomplanView = Backbone.Marionette.CompositeView.extend({
    template: "#template-roomplan",
    itemView: RowView,
    itemViewContainer: "[data-role='rows']",

    events: {
        "click [data-role='seat']": "onSeatSelected"
    },

    onSeatSelected: function(event) {
        var $target = $(event.target);
        var rowId = $target.data("row");
        var seatId = $target.data("seat");

        this.$el.find("[data-role='seat']").removeClass("selected");
        $target.addClass("selected");

        this.options.selectionModel.set(
            this.collection.at(rowId).get("seats").at(seatId).toJSON()
        );
    }
});

var DetailsView = Backbone.Marionette.ItemView.extend({
    template: "#template-details",

    modelEvents: {
        "change": "render"
    }
});

var roomplan = new RowCollection();
roomplan.fetch({reset: true});

var selection = new SeatModel();

$(document).ready(function() {
    LocatorApp.roomplan.show(new RoomplanView({
        collection: roomplan,
        selectionModel: selection
    }));
    LocatorApp.details.show(new DetailsView({
        model: selection
    }));
});


