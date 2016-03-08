$(window).scroll(function() {
    //Got this from here http://codepen.io/sotayamashita/pen/pqLcv
    // Get scroll position
    var s = $(window).scrollTop(),
    // scroll value and opacity
    opacityVal = (s / 150);
    // opacity value 0% to 100%
    $('.non-blur-img').css('opacity', opacityVal);
});

$.getJSON('skills.json', function(data) {
    console.log("hell");
    loadProgress(data);
});

setAge();

/**
* Gets difference between my date of bith and current date.
*/
function setAge() {
    var dateOfBith = new Date('1994/09/12 00:13:06');
    var diff = Math.abs(new Date() - dateOfBith);
    $("#age").html(Math.floor(diff/1000/60/60/24/365));
}

function loadProgress(skills) {
    for (var skill in skills) {
        var htmlOutput = '<div class="col-xs-12 col-md-6"><h3>' + skill + '</h3><dl class="dl-horizontal">'
        for (var tool in skills[skill]) {
            var toolInfo = skills[skill][tool];
            htmlOutput += '<dt class="pull-left" style="margin: 0;">' + tool + ': </dt><dd><div class="progress"><div class="progress-bar ' + getClassByProgress(toolInfo['progress']) + ' progress-bar-striped ' + (toolInfo['active'] ? "active" : "") + '" role="progressbar" aria-valuenow="'+ toolInfo['progress'] +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ toolInfo['progress'] +'%"><span class="sr-only">' + toolInfo['progress'] + '% Complete (success)</span>' + toolInfo['progress'] + '%</div></div></dd>'
        }
        htmlOutput += "</dl></div>";
        $('.skills-content').append(htmlOutput);
    }

    function getClassByProgress(progress) {
        if (progress <= 20) {
            return "progress-bar-danger";
        } else if (progress < 40) {
            return "progress-bar-warning";
        } else if (progress < 70) {
            return "progress-bar-info";
        } else {
            return "progress-bar-success";
        }
    }
}
