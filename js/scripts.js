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
    console.log(url);
    $('#video_modal').on('hide.bs.modal', function () {
        $('#custom_video').attr('src', '')
    })
        .on('show.bs.modal', function () {
            $('#custom_video').attr('src', url)
        });
});

