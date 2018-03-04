$.ajax({
    url: 'http://0.0.0.0:8881/stations',
    type: "GET",
    dataType: "json",
    data: {
    },
    contentType: "application/json; charset=utf-8",
    xhrFields: {
                   withCredentials: true
                },
    crossDomain: true,
    cache: false,
    success: function (result) {
        console.log(result);
        var dataset = result.data;
        var departureStation = document.getElementById('departureStation');
        var arrivalStation = document.getElementById('arrivalStation');
        for(var i = 0; i < dataset.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = dataset[i].abbr;
            opt.value = dataset[i].abbr;
           //departureStation.appendChild(opt);
            arrivalStation.appendChild(opt);
        };
        for(var i = 0; i < dataset.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = dataset[i].abbr;
            opt.value = dataset[i].abbr;
            departureStation.appendChild(opt);
        };
    },
    error: function () {
        console.log("error");
    }
});



$(function(){
    $.getJSON('', function(data) {
        console.log(data);

    });
});