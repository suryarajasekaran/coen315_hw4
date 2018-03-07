intervalId = null;
setInterval(function () {document.getElementById("searchSchedules").onclick();}, 30000);
document.getElementById("searchSchedules").onclick = function () {
        var filterDepartureStation = document.getElementById("departureStation").value;
        var filterArrivalStation = document.getElementById("arrivalStation").value;

        if (filterDepartureStation =='Select' || !filterArrivalStation=="Select") {
            document.getElementById("results").innerHTML = "Select both Arrival and Departure station ";
        }
        else if ((filterDepartureStation!='Select') && ((filterDepartureStation==filterArrivalStation) || (filterArrivalStation==filterDepartureStation))) {
            document.getElementById("results").innerHTML = "Arrival and Departure stations cant be the same ";
        }
        else
        {
        var getStationInfoGM = document.getElementById("departureStation").value;
        $.ajax({
                url: "http://0.0.0.0:8881/trips?source="+filterDepartureStation+"&dest="+filterArrivalStation,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function(result) {
                    console.log(result);
                    document.getElementById("results").innerHTML = " ";
                    var dataset = result.data;
                    var results = document.getElementById("results");
                    var gmaps = document.getElementById("map");
                    for(var i = 0; i < dataset.length; i++) {
                        var opt = document.createElement('option');
                        timer(dataset[0]["@origTimeMin"]);
                        opt.innerHTML = "Leg "+(i+1)+": &emsp;|&emsp;Departure Time : " +String(dataset[i]["@origTimeMin"] + "&emsp;|&emsp;"+"Arrival Time : " + dataset[i]["@destTimeMin"] + "&emsp;|&emsp; Fare : " + dataset[i]["@fare"]);
                        opt.value = String(dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        results.appendChild(opt);
                    }


                        /*var deptrain = dataset[0]["@origTimeMin"];
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

                  });*/

                  },
                error: function() {
                    // Fail message
                     console.log("error");
                },
        });
        }
};

function timer(destTimeHours) {
    // Return today's date and time
    var currentTime = new Date();
    var day = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
    var hour = convert_to_24h(destTimeHours)[0]
    var min = convert_to_24h(destTimeHours)[1]
    // Set the date we're counting down to
    var countDownDate = new Date(year,month,day,hour,min).getTime();
    // Update the count down every 1 second
    var x = setInterval(function() {
        if (intervalId != x && intervalId != null){
            clearInterval(intervalId);
        }
        intervalId = x;
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        distance=countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="Countdown"
        document.getElementById("Countdown").innerHTML = "Time left till the next train departs:"+days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            clearInterval(window.refreshIntervalId);
            document.getElementById("Countdown").innerHTML = "Your Train has departed";
        }

    }, 1000);
  };

function convert_to_24h(time_str) {
    // Convert a string like 10:05 PM to 24h format, returns like [22,5]
    var time = time_str.match(/(\d+):(\d+) (\w)/);
    var hours = Number(time[1]);
    var minutes = Number(time[2]);
    var meridian = time[3].toLowerCase();

    if (meridian == 'p' && hours < 12) {
      hours += 12;
    }
    else if (meridian == 'a' && hours == 12) {
      hours -= 12;
    }
    return [hours, minutes];
  };


function initMap() {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 37.77, lng: -122.447}
        });
        directionsDisplay.setMap(map);

        calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = "TRANSIT";
    directionsService.route({
      origin: {lat: 37.77, lng: -122.447},  // Haight.
      destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode[selectedMode]
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}