//setInterval(function () {document.getElementById("myButtonId").click();}, 1000);
document.getElementById("searchSchedules").onclick = function () {
        var filterDepartureStation = document.getElementById("departureStation").value;
        var filterArrivalStation = document.getElementById("arrivalStation").value;
        $.ajax({
                url: "http://0.0.0.0:8881/trips?source="+filterDepartureStation+"&dest="+filterArrivalStation,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,

                success: function(result) {
                    console.log(result);
                    var dataset = result.data;
                    var results = document.getElementById("results");
                    for(var i = 0; i < dataset.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        opt.value = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        results.appendChild(opt);
                    };
               },

                error: function() {
                    // Fail message
                     console.log("error");
                },
        });
};