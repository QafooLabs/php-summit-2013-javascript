LocatorApp.service("SeatAnnotationService", function() {
    return {
        annotate: function(roomplan) {
            return {
                "rows": roomplan.rows.map(function(row) {
                    return {
                        "rownumber": row.rownumber,
                        "seats": row.seats.map(function(seat, seatIndex) {
                            seat.row = row.rownumber;
                            seat.seat = seatIndex + 1;
                            return seat;
                        })
                    };
                })
            };
        }
    };
});