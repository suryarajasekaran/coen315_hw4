setInterval(function () {document.getElementById("searchSchedules").onclick();}, 30000);
document.getElementById("searchSchedules").onclick = function () {
        var filterDepartureStation = document.getElementById("departureStation").value;
        var filterArrivalStation = document.getElementById("arrivalStation").value;
        var getStationInfoGM = document.getElementById("departureStation").value;
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
                    var gmaps = document.getElementById("map");
                    for(var i = 0; i < dataset.length; i++) {
                        var opt = document.createElement('option');
                        opt.innerHTML = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        opt.value = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        results.appendChild(opt);
                    }

                    var deptrain = dataset[0]["@destTimeMin"];

                    $.ajax({
                            url2: "http://0.0.0.0:8881/station?source="+getStationInfoGM,
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            cache: false,
                            success: function(result) {
                                console.log(result);
                                var gm = result.data;
                                var gmaplat = document.createElement('option1');
                                var gmaplong = document.createElement('option2');
                                gmaplat.innerHTML = dataset[0].gtfs_latitude;
                                gmaplat.value = dataset[0].gtfs_latitude;
                                gmaplong.innerHTML = dataset[0].gtfs_longitude;
                                gmaplong.value = dataset[0].gtfs_longitude;


                           },
                            error: function() {
                            // Fail message
                            console.log("error");
                            },

                  });
                       /* Countdown
                       var destTimeHours = dataset[0]["@destTimeMin"];
                      var deadline = new Date, time = destTimeHours.split(/\:|\-/g);
                      var deadlineHrs = deadline.setHours(time[0]);
                      var deadlineMin = deadline.setMinutes(time[1]);
                      var currentime = new Date();
                      var deadlines = Date.parse(deadline)
                      var t = deadlines - Date.parse(new Date());
                      var seconds = ((t/1000) % 60) ;
                      var minutes = ( (t/1000/60) % 60 );
                      var hours = ( (t/(1000*60*60)) % 24 );
                      var days = ( t/(1000*60*60*24) );
                      document.getElementById("Countdown").innerHTML =  deadlineMin;
                      //days + ":" + ":" + minutes ":"+ seconds
                      */
                  },
                error: function() {
                    // Fail message
                     console.log("error");
                },
        });
};