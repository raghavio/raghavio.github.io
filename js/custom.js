(function() {
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
        loadProgress(data);
    });

    $.getJSON('projects.json', function(data) {
        loadProjects(data);
    });

    setAge();
})();

/**
* Gets difference between my date of bith and current date.
*/
function setAge() {
    var dateOfBith = new Date('1994/09/12 00:13:06');
    var diff = Math.abs(new Date() - dateOfBith);
    $("#age").html(Math.floor(diff/1000/60/60/24/365));
}

/**
* Generates project section html from JSON file.
*/
function loadProjects(projects) {
    for (var project in projects) {
        var sub_heading = projects[project]['sub-heading'];
        var summary = projects[project]['summary'];
        var source_link = projects[project]['source'];
        var live_link = projects[project]['live'];
        var image_name = projects[project]['image-name'];

        var htmlOutput = '<div class="col-xs-12 col-md-6" style="margin-bottom:30px;"> <div class="project-item"> <div class="hidden-xs hidden-sm"> <div class="project-caption"> <h3 class="text-center">' + project + '<br> <small>' + sub_heading + '</small> </h3>';
        var paragraphs = '';
        for (var i=0; i < summary.length; i++) {
            paragraphs += '<p>' + summary[i] + '</p>'
        }
        htmlOutput += paragraphs + '<a href="' + source_link + '" target="_blank" class="btn btn-small btn-default"><i class="fa fa-github"></i> Github</a> <a href="' + live_link + '" target="_blank" class="pull-right btn btn-small btn-default"><i class="fa fa-internet-explorer"></i> Live demo</a> </div> <img class="project-item-image center-block img-responsive" src="images/' + image_name +'" alt="' + project + '"> </div> <div class="visible-xs visible-sm"> <div class="thumbnail"> <img class="project-item-image center-block img-responsive" src="images/' + image_name + '" alt="' + project + '"> <div class="caption"> <h3 class="text-center"> ' + project + '<br> <small>' + sub_heading + '</small> </h3> ' + paragraphs + ' <a href="' + source_link + '" target="_blank" class="btn btn-small btn-default"><i class="fa fa-github"></i> Github</a> <a href="' + live_link + '" target="_blank" class="pull-right btn btn-small btn-default"><i class="fa fa-internet-explorer"></i> Live demo</a> </div> </div> </div> </div> </div>';
        $('#projects-content').append(htmlOutput);
    }
}

/**
* Generates progress bars html from JSON file for skills section.
*/
function loadProgress(skills) {
    var count = 0;
    var skills_length = Object.keys(skills).length;
    var htmlOutput = '';
    for (var skill in skills) {
        if (count % 2 == 0 || count == skills_length && count % 2 != 0) {
            htmlOutput += '<div class="row">'
        }
        count++;
        htmlOutput += '<div class="col-xs-12 col-md-6"><h3>' + skill + '</h3><dl class="dl-horizontal">'
        for (var tool in skills[skill]) {
            var toolInfo = skills[skill][tool];
            htmlOutput += '<dt style="margin: 0;">' + tool + ': </dt><dd><div class="progress"><div class="progress-bar ' + getClassByProgress(toolInfo['progress']) + ' progress-bar-striped ' + (toolInfo['active'] ? "active" : "") + '" role="progressbar" aria-valuenow="'+ toolInfo['progress'] +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ toolInfo['progress'] +'%"><span class="sr-only">' + toolInfo['progress'] + '% Complete (success)</span>' + toolInfo['progress'] + '%</div></div></dd>'
        }
        htmlOutput += "</dl></div>";
        if (count % 2 == 0 || count == skills_length && count % 2 != 0) {
            htmlOutput += '</div>'
            $('.skills-content').append(htmlOutput);
            htmlOutput = '';
        }
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
