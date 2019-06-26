"use strict";

//GOOGLE MAPS
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(51.508742, -0.120850),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// FUNCTION TO STOP VIDEO PLAYBACK ON MODAL CLOSE
$(document).ready(function () {
    var url = $('#custom_video').attr('src');
    $('#video_modal').on('hide.bs.modal', function () {
        $('#custom_video').attr('src', '')
    })
        .on('show.bs.modal', function () {
            $('#custom_video').attr('src', url)
        });
});

$(function () {
    ajax('../json/pricing_plans.json', preparePricingPlans); //generates pricing section
    handleScrollEvents();

});

// handles running numbers animation using countUp.js
var clientsNumber = parseFloat(document.getElementById('clients_counter').innerText);
var awardsNumber = parseFloat(document.getElementById('awards_counter').innerText);
var linesNumber = parseFloat(document.getElementById('lines_counter').innerText);
var projectsNumber = parseFloat(document.getElementById('projects_counter').innerText);
var counterTransitionTime = 2;
var options = {
    useGrouping: false,
    useEasing: true
};
var clientsCounter = new CountUp('clients_counter', 0, clientsNumber, 0, counterTransitionTime, options);
var awardsCounter = new CountUp('awards_counter', 0, awardsNumber, 0, counterTransitionTime, options);
var linesCounter = new CountUp('lines_counter', 0, linesNumber, 0, counterTransitionTime, options);
var projectsCounter = new CountUp('projects_counter', 0, projectsNumber, 0, counterTransitionTime, options);


var scrollEvents = {
    runningNumbers: false,
    progressbars: false
};


function handleScrollEvents() { //handles running numbers and progress bar behaviour on scroll & load;
    // checks if running numbers is scrolled to on load
    var counterElms = document.getElementsByClassName('counter');
    console.log(counterElms);
    var elm = $(window);
    var scrolledHeight = elm.scrollTop();
    if (scrolledHeight + elm.outerHeight() >= $('#running_numbers').position().top && !scrollEvents.runningNumbers) {
        animateSlideDown();
        startRunningNumbers();
        scrollEvents.runningNumbers = true;
    }
    // checks if running numbers is scrolled to on scroll
    $(window).on('scroll', function (e) {
        var elm = $(window);
        var scrolledHeight = elm.scrollTop();
        if (scrolledHeight + elm.outerHeight() >= $('#running_numbers').position().top && !scrollEvents.runningNumbers) {
            animateSlideDown();
            startRunningNumbers();
            scrollEvents.runningNumbers = true;
        }
    });

    //starts running numbers animations
    function startRunningNumbers() {
        linesCounter.start();
        clientsCounter.start();
        projectsCounter.start();
        awardsCounter.start();
    }

    function animateSlideDown() {
        let i;
        for (i = 0; i < counterElms.length; i++) {
            let animationDelay = [i] / 5 + 's';
            counterElms[i].classList.add('animated', 'slideInDown');
            counterElms[i].style.animationDelay = animationDelay;
        }
    }
}


function ajax(url, callBack) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callBack(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// GENERATES HTML FOR PRICING PLANS
function preparePricingPlans(response) {
    var html = '';
    var plans = response.plans;

    for (let i in plans) {
        if (plans.hasOwnProperty(i)) {
            let active = '';
            if (plans[i].active) {
                active = 'active';
            }
            html +=
                '<div class="col-md-4">' +
                '<table class="plan-table text-center table-bordered rounded">' +
                '<thead>' +
                '<tr>' +
                '<th class="plan-header text-center position-relative ' + active + '">' +
                '<div class="hexagon-container">' +
                '<div class="hexagon mx-auto">' +
                '<div class="hexagon-content">' +
                '<h6 class="text-center price">' + plans[i].price + '</h6>' +
                '<p class="periodicity text-center text-uppercase">' + plans[i].periodicity + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<p class="plan-name text-uppercase">' + plans[i].name + '</p>' +
                '</th>' +
                '</tr>' +
                '</thead>' + //end of table header
                '<tbody>';
            for (let j in plans[i].benefits) {
                if (plans[i].benefits.hasOwnProperty(j)) {
                    let indicator = '<i class="fas fa-times px-2 text-danger"></i>';
                    if (plans[i].benefits[j]) {
                        indicator = '<i class="fas fa-check px-2 text-success"></i>';
                    }
                    html += '<tr><td class="text-capitalize">' +
                        indicator + j + '</td></tr>'
                }
            }
            html += '</tbody><tfoot><td class="py-3"><button class="btn btn-plan"><i class="fas fa-shopping-cart px-2">' +
                '</i>Order now</button></td></tfoot></table></div>'
        }
    }
    document.getElementById('plans_section').innerHTML = html;
}






