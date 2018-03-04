//document.getElementById("searchSchedules").onclick = function () {
document.getElementById("departureStation").onclick = function () {
        var getStationInfo = document.getElementById("departureStation").value;
        $.ajax({
                url: "http://0.0.0.0:8881/station?source="+getStationInfo,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (result) {
                console.log(result);
                //var StationInfo = document.getElementById("StationInfo").value;
                //StationInfo.result.data;
                document.getElementById("StationInfo").innerHTML = JSON.stringify(result);
            },
    error: function () {
        console.log("error");
    }
});
};