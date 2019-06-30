"use strict";

function myMap() {
    var location = {lat: 55.730521, lng: 21.080492};
    var mapProp = {
        center: location,
        zoom: 15,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({ position: location, map: map})
}


var topBarHidden = false;

$('#btn-hide-top').on('click', function(){
    if (topBarHidden === false){
        $('#top').addClass('d-none');
        $('#btn-hide-top').html('<i class="fas fa-chevron-down"></i>');
        topBarHidden = true;
    } else {
        $('#top').removeClass('d-none');
        $('#btn-hide-top').html('<i class="fas fa-chevron-up"></i>');
        topBarHidden = false
    }
});

$('.card').on('show.bs.collapse hide.bs.collapse', function(e){
    if(e.type === 'show') {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active')
    }
});


$(function () {
    // FUNCTION TO STOP VIDEO PLAYBACK ON MODAL CLOSE
    var url = $('#custom_video').attr('src');
    $('#video_modal').on('hide.bs.modal', function () {
        $('#custom_video').attr('src', '')
    })
        .on('show.bs.modal', function () {
            $('#custom_video').attr('src', url)
        });

    ajax('../json/pricing_plans.json', preparePricingPlans);
    handleScrollEvents();
});

function handleScrollEvents() { // handles running numbers and progress bars on load & scroll
    var scrollEvents = {
        runningNumbers: false,
        progressBars: false
    };
    var elm = $(window);
    var scrolledHeight = elm.scrollTop();
    if (scrolledHeight + elm.outerHeight() >= $('#progress_bars').position().top && !scrollEvents.progressBars) {
        runProgressBars();
        scrollEvents.progressBars = true;
    }
    if (scrolledHeight + elm.outerHeight() >= $('#running_numbers').position().top && !scrollEvents.runningNumbers) {
        animateSlideDown();
        runCounters();
        scrollEvents.runningNumbers = true;
    }
    $(window).on('scroll', function () {
        var elm = $(window);
        var scrolledHeight = elm.scrollTop();
        if (scrolledHeight + elm.outerHeight() >= $('#progress_bars').position().top && !scrollEvents.progressBars) {
            runProgressBars();
            scrollEvents.progressBars = true;
        }
        if (scrolledHeight + elm.outerHeight() >= $('#running_numbers').position().top && !scrollEvents.runningNumbers) {
            animateSlideDown();
            runCounters();
            scrollEvents.runningNumbers = true;
        }
    });
}

function runCounters() { //handles counters with countUp.js
    var options = {
        useGrouping: false,
        useEasing: true
    };
    var counters = $('.number');

    counters.each(function (index) {
        var value = $(counters[index]).html();
        var counterAnimation = new CountUp(counters[index], 0, value, 0, 2, options);
        counterAnimation.start();
    });
}

function animateSlideDown() {
    var counterElms = document.getElementsByClassName('counter');
    for (let i = 0; i < counterElms.length; i++) {
        let animationDelay = [i] / 5 + 's';
        counterElms[i].classList.add('slide-down-animation');
        counterElms[i].style.animationDelay = animationDelay;
    }
}


function runProgressBars() { //handles animation for progress bars
    var bars = document.getElementsByClassName('progress-bar');
    for (let i = 0; i < bars.length; i++) {
        var elm = bars[i];
        animateBar(elm);
        animateText(elm)

    }

    function stop(interval) {
        clearInterval(interval)
    }

    function animateBar(elm) {
        var innerBubbleElm = elm.getElementsByClassName('inner-bubble')[0];
        var percentage = parseFloat(elm.getAttribute('aria-valuenow')) + '%';
        var counter = 0;
        var interval = setInterval(function () {
            elm.style.width = percentage;
            innerBubbleElm.innerText = counter + '%';

            if (counter === parseInt(percentage)) {
                stop(interval);
                animateText(elm);
            }
            counter++;
        }, 30);
    }

    function animateText(elm) {
        var barTitleElm = elm.getElementsByClassName('progress-bar-title')[0];
        barTitleElm.style.left = 0;

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
                '<div class="col-md-4 py-5 py-md-0">' +
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






