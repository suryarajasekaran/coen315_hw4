document.getElementById("searchSchedules").onclick = function () {
        var filterDepartureStation = document.getElementById("departureStation").value;
        var filterArrivalStation = document.getElementById("arrivalStation").value;
        $.ajax({
                url: "http://0.0.0.0:8881/trips?source="+filterDepartureStation+"&dest="+filterArrivalStation,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function() {
                    // Success message
                    // inject that data into HTML
                },
                error: function() {
                    // Fail message
                    // inject that data into HTML
                },
        });
};