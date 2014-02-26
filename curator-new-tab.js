function shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function rotateArray() {

    return [
        'polaroid-rotate-m2',
        'polaroid-rotate-m1',
        'polaroid-rotate-p2',
        'polaroid-rotate-p1'
    ];
}

var girl_of_the_day_id = 0;
var girl_of_the_day_name = "";
var girl_of_the_day_image = "";
var girl_of_the_day_url = "";
var girl_of_the_day_date = "";

function getGirlOfTheDay() {

    $.ajax({
    
        url: "http://curator.im/api/girl_of_the_day/",
        type: "GET",
        data: {
            token : "53b7c0f21db84334b9aaaaccb7d2538e",
            format : "json",
        },
        dataType: "json",
        beforeSend: function( xhr ) {
            //console.log('loading');
        },
        success: function(data) {

            girl_of_the_day_id = data.results[0].id;
            girl_of_the_day_name = data.results[0].name;
            girl_of_the_day_image = data.results[0].image;
            girl_of_the_day_url = data.results[0].url + '?utm_source=girl-of-the-day&utm_medium=new-tab&utm_campaign=fuluball-chrome-new-tab';
            girl_of_the_day_date = data.results[0].date;

            $('#girl-image-small').attr("src", girl_of_the_day_image); 
            $('#girl-name-small').html('<a href="'+girl_of_the_day_url+'">'+chrome.i18n.getMessage("girl_of_the_day_text")+'：'+girl_of_the_day_name+'</a>'); 

            $('#search-bar-block').addClass("bigEntrance");

        }

    });

}

function getGirlStream() {

    $.ajax({
    
        url: "http://curator.im/api/stream/",
        type: "GET",
        data: {
            token : "53b7c0f21db84334b9aaaaccb7d2538e",
            format : "json",
        },
        dataType: "json",
        beforeSend: function( xhr ) {
            //console.log('loading');
        },
        success: function(data) {
            
            var girl_stream = shuffle(data.results);
            var girl_image = girl_stream[0].image;
            var girl_name = girl_stream[0].name;

            $('#bg-block').css('background-image', 'url('+girl_image+')')
            $('#girl-image').attr("src", girl_image); 
            $('#girl-name').html(girl_name); 

            $('#girl-photo-block').addClass("bigEntrance");

        }

    });

}

function getGirls() {

    getGirlStream();
    getGirlOfTheDay();

}

$(document).ready(function() {

    // i18n
    document.title = chrome.i18n.getMessage("application_title");
    $('#speech-input-field').attr("placeholder", chrome.i18n.getMessage("google_search_text"));
    $('#girl-curator-link').html(chrome.i18n.getMessage("girl_curator_text"));
    $('#girl-stream-link').html(chrome.i18n.getMessage("girl_stream_text"));
    $('#girl-of-the-day-link').html(chrome.i18n.getMessage("girl_of_the_day_text"));
    $('#girl-calendar-link').html(chrome.i18n.getMessage("girl_calendar_text"));

    var polaroid_rotate = shuffle(rotateArray());
    $('#girl-photo-polaroid').addClass(polaroid_rotate[0]);

    $(window).resize(function() {

        var window_height = $(window).height();
        var window_width = $(window).width();

        if (window_height<=600) {
            window_height = 600;   
        }

        $('body').height(window_height);
        $('body').width(window_width);

        var left_width = window_height*0.65;
        var right_width = window_height*0.35;

        $('#main-content-inner').width(window_height);
        $('#girl-photo-block').width(left_width);
        $('.image-frame').width(left_width-30);
        $('.image-frame').height(left_width-30);
        $('.image-frame').css('line-height', (left_width-30)+'px'); 
        $('.image-frame img').width(left_width-30); 

        $('#search-bar-block').width(right_width-10);
        $('#speech-input-field').width(right_width-60);
        $('.image-frame-small').width(right_width-55);
        $('.image-frame-small').height(right_width-55);
        $('.image-frame-small').css('line-height', (right_width-55)+'px'); 
        $('.image-frame-small img').width(right_width-55);   

    });

    $(window).trigger('resize');

    //callback handler for form submit
    $("#google-search-form").submit(function(e) {
        
        var google_search = "http://www.google.com.tw/#q="+$('#speech-input-field').val();
        window.location = google_search;
        
        e.preventDefault(); //STOP default action
        e.unbind(); //unbind. to stop multiple form submit.
    
    });
    
    getGirls();

});
