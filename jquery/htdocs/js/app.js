$(document).ready(function() {
    // Initialize all the handlebar templates
    var Template = {};
    Template.roomplan = Handlebars.compile($("#template-roomplan").html());

    // Register all used template partials (subtemplates)
    Handlebars.registerPartial("row", $("#template-row").html());
    Handlebars.registerPartial("seat", $("#template-seat").html());

    // Register Handlebars helpers for proper if checks
    Handlebars.registerHelper('if-eq', function(a, b, options) {
        if (a === b) {
            return options.fn(this);
        }
        else {
            return options.inverse(this);
        }
    });

    var roomplanRequest = $.getJSON("data/roomplan.json");

    $.when(roomplanRequest).done(function(roomplanData) {
        $("[data-role='roomplan']").roomplan({
            template: Template.roomplan,
            data: roomplanData
        });
    });
});