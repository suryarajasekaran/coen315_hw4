//document.getElementById("searchSchedules").onclick = function () {
document.getElementById("departureStation").onchange = function () {
        var getStationInfo = document.getElementById("departureStation").value;
        $.ajax({
                url: "http://0.0.0.0:8881/station?source="+getStationInfo,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (result) {
                console.log(result);
                var dataset = result.data;
                //var StationInfo = document.getElementById("StationInfo").value;
                //StationInfo.result.data;
                document.getElementById("StationInfo").innerHTML = "Name of station :" + dataset.name+ "<br> Address of station : "+ dataset.address+
                 "<br> Platform Info :" + dataset.platform_info + "<br> <br> <b>More Information about the station</b> <br> Intro :" +
                 dataset.intro['#cdata-section']+ "<br> Food :" +dataset.food['#cdata-section']+ "<br> Shopping :" +dataset.shopping['#cdata-section'] + "<br>Attraction :" + dataset.attraction['#cdata-section']
                  + "<br>Link : " +dataset.link['#cdata-section'];
                //JSON.stringify(result);
            },
    error: function () {
        console.log("error");
    }
});
};