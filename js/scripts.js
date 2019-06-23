"use strict";


//google maps function
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// function to stop video playback on modal close
$(document).ready(function () {
    var url = $('#custom_video').attr('src');
    $('#video_modal').on('hide.bs.modal', function () {
        $('#custom_video').attr('src', '')
    })
        .on('show.bs.modal', function () {
            $('#custom_video').attr('src', url)
        });
});
















//AJAX TESTING

document.getElementById('jsonTest').addEventListener('click', function(e){
    e.preventDefault();
    ajax('../json/pricing_plans.json');
    return false;
});


function ajax( url, callBack){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            callBack(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function preparePricingPlans( data) {

    
}


