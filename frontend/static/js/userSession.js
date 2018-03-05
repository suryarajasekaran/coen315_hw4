//add and edit comments and make it look more like your own code

if (typeof Storage !== "undefined") {
  if (localStorage.visitcount) {
    document.getElementById("count").innerHTML ="Welcome back, you've been here " +localStorage.visitcount +
      " times before.";
    localStorage.visitcount = Number(localStorage.visitcount) + 1;
  } else {
    localStorage.visitcount = 1;
    document.getElementById("count").innerHTML =
      "This is your first time here! Welcome.";
  }
  // document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
} else {
   alert("Sorry, your browser does not support web storage.  Changes will not be saved");
  document.getElementById("count").innerHTML =
    "Sorry, your browser does not support web storage...";
}

console.log("localstorage visit count now: " + localStorage.visitcount);

// localStorage.clear();


/*
setInterval(function () {document.getElementById("searchSchedules").onclick();}, 30000);
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
                    var gmaps = document.getElementById("map");
                    for(var i = 0; i < dataset.length; i++) {
                        var opt = document.createElement('option');
                        var gmap = document.createElement('option');
                        opt.innerHTML = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        opt.value = String(dataset[i]["@destTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@origTimeMin"] + "&emsp;|&emsp;" + dataset[i]["@fare"]);
                        results.appendChild(opt);

                        gmap.innerHTML = dataset[i][]
                        gmaps.appendChild(gmap);

                    };

                    //GMAPS


                       // Countdown
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
                  },
                error: function() {
                    // Fail message
                     console.log("error");
                },
        });
};
*/