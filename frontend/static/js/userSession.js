document.getElementById("session").onclick = function () {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("count").innerHTML = "You have visited the site " + localStorage.clickcount + " time(s).";
    }