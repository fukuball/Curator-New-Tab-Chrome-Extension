function shuffle(o) {
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
var polaroid_rotate_class = "";

function updateGirlOfTheDayView(girl_of_the_day) {
    girl_of_the_day_id = girl_of_the_day.id;
    girl_of_the_day_name = girl_of_the_day.name;
    girl_of_the_day_image = girl_of_the_day.image;
    girl_of_the_day_url = girl_of_the_day.url + '?utm_source=girl-of-the-day&utm_medium=new-tab&utm_campaign=fuluball-chrome-new-tab';
    girl_of_the_day_date = girl_of_the_day.date;

    $('#girl-image-small').attr("src", girl_of_the_day_image); 
    $('#girl-name-small').html('<a href="'+girl_of_the_day_url+'">'+chrome.i18n.getMessage("girl_of_the_day_text")+'：'+girl_of_the_day_name+'</a>'); 

    $('#search-bar-block').addClass("bigEntrance");
}

function getGirlOfTheDay() {

    var lastDay = localStorage.getItem('last_day');
    var girl_of_the_day = JSON.parse(localStorage.getItem('girl_of_the_day'));
    var date = new Date();

    if (!lastDay || !girl_of_the_day || date.getDate().toString() != lastDay) {

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

                girl_of_the_day = data.results[0];
                updateGirlOfTheDayView(girl_of_the_day);
                chrome.extension.getBackgroundPage().document.getElementById('girl-of-the-day-image').src = girl_of_the_day.image;
                localStorage.setItem('last_day', date.getDate().toString());
                localStorage.setItem('girl_of_the_day', JSON.stringify(girl_of_the_day));

            }

        });

    } else {
        
        updateGirlOfTheDayView(girl_of_the_day);
    
    }

    //date.destroy();

}

function updateGirlStreamView(girl_stream) {
    var girl_image = girl_stream.image;
    var girl_name = girl_stream.name;
    var girl_url = girl_stream.url + '?utm_source=girl-stream&utm_medium=new-tab&utm_campaign=fuluball-chrome-new-tab';

    $('#bg-block').css('background-image', 'url('+girl_image+')')
    $('#girl-image').attr("src", girl_image); 
    $('#girl-name').html('<a href="'+girl_url+'">'+girl_name+'</a>'); 

    $('#girl-photo-block').addClass("bigEntrance");

    $('#girl-photo-block').imagesLoaded( function() {
        $(".spinner").removeClass("animated fadeIn");
        $(".spinner").addClass("animated fadeOut");
    });

}

function updateGirlStreamData() {
    $.ajax({
        url: "http://curator.im/api/stream/",
        type: "GET",
        data: {
            token : "53b7c0f21db84334b9aaaaccb7d2538e",
            format : "json",
        },
        dataType: "json",
        success: function(data) {
            updateGirlStreamView(data.results[0]);
            localStorage.setItem('girl_stream', JSON.stringify(data));
            localStorage.setItem('girl_stream_id', '1');
        }
    });
}

function getGirlStream() {
    
    var predata = localStorage.getItem('girl_stream');
    var preGirlStreamId = localStorage.getItem('girl_stream_id');
    
    if (!predata) {

        updateGirlStreamData();
    
    } else {
        
        var data = JSON.parse(predata);
        var id = parseInt(preGirlStreamId);
        updateGirlStreamView(data.results[id]);
        id = id + 1;
        
        if (id >= data.results.length) {
            updateGirlStreamData();
        } else {
            localStorage.setItem('girl_stream_id', id.toString());
            chrome.extension.getBackgroundPage().document.getElementById('girl-stream-image').src = data.results[id].image;
        } 

    } 
}

function getGirls() {

    getGirlStream();
    getGirlOfTheDay();

}

function processNode(node) {
    // recursively process child nodes
    if(node.children) {
        node.children.forEach(function(child) { processNode(child); });
    }

    // print leaf nodes URLs to console
    if(node.url) { console.log(node.url); }
}

function tool_bar_open() {
    $('#header-block').addClass('slideDown');
    localStorage.show_toolbar = 'true';
}

function tool_bar_close() {
    $('#header-block').removeClass('slideDown');
    localStorage.show_toolbar = 'false';
}

$(document).ready(function() {

    // i18n
    document.title = chrome.i18n.getMessage("application_title");
    $('#speech-input-field').attr("placeholder", chrome.i18n.getMessage("google_search_text"));
    $('#girl-curator-link').html(chrome.i18n.getMessage("girl_curator_text"));
    $('#girl-stream-link').html(chrome.i18n.getMessage("girl_stream_text"));
    $('#girl-of-the-day-link').html(chrome.i18n.getMessage("girl_of_the_day_text"));
    $('#girl-calendar-link').html(chrome.i18n.getMessage("girl_calendar_text"));
    $('#web-store-link-text').html(chrome.i18n.getMessage("web_store_link_text"));
    $('#top-sites-link-text').html(chrome.i18n.getMessage("top_sites_link_text"));

    // get bookmarks
    /*chrome.bookmarks.getTree(function(itemTree){
        console.log(itemTree);
        itemTree.forEach(function(item){
            processNode(item);
        });
    });*/

    // get top sites
    chrome.topSites.get(function(itemTree) {
        console.log(itemTree);
        var site_count = 1;

        itemTree.forEach(function(item) {

            if (site_count<=5) {

                $('#content-block').append (
                    '<div class="boxgrid slideright top-sites-block-fixed">'+
                        '<img class="cover" src="http://api.webthumbnail.org/?width=250&height=200&screen=1024&url='+item.url+'"/>'+
                        '<h3>'+
                            '<a href="'+item.url+'">'+
                                'Top '+site_count+': '+item.title+
                            '</a>'+
                        '</h3>'+
                    '</div>'
                );
            }

            site_count++;

        });
        
    });

    var polaroid_rotate = shuffle(rotateArray());
    polaroid_rotate_class = polaroid_rotate[0];
    $('#girl-photo-polaroid').addClass(polaroid_rotate_class);

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
        
        var google_search = "https://www.google.com/#q="+$('#speech-input-field').val();
        window.location = google_search;
        
        e.preventDefault(); //STOP default action
        e.unbind(); //unbind. to stop multiple form submit.
    
    });
    
    getGirls();

    $('#tool-bar-switch').switchButton({
        checked: "true" == localStorage.getItem('show_toolbar'), //default null
        labels_placement: "left",
        on_label: chrome.i18n.getMessage("tool_bar_open"),
        off_label: chrome.i18n.getMessage("tool_bar_close"),
        on_callback: tool_bar_open,
        off_callback: tool_bar_close
    });

    $(document.body).on('click', '#top-site-gravity', function() {
        
        $(".spinner").removeClass("animated fadeOut");
        $(".spinner").addClass("animated fadeIn");
        $(this).addClass("animated bounceOutDown");

        $('body').jGravity({ // jGravity works best when targeting the body
            target: '.top-sites-block-fixed', // Enter your target critera e.g. 'div, p, span', 'h2' or 'div#specificDiv', or even 'everything' to target everything in the body
            ignoreClass: 'ignoreMe', // Specify if you would like to use an ignore class, and then specify the class
            weight: 25, // Enter any number 1-100 ideally (25 is default), you can also use 'heavy' or 'light'
            depth: 5, // Enter a value between 1-10 ideally (1 is default), this is used to prevent targeting structural divs or other items which may break layout in jGravity
            drag: true // Decide if users can drag elements which have been effected by jGravity
        });

        $('.top-sites-block-fixed').css('visibility', 'visible');

        setTimeout(function () {
            $(".spinner").removeClass("animated fadeIn");
            $(".spinner").addClass("animated fadeOut");
        }, 3000);

        $('.boxgrid.slideright').hover(function(){
            $(".cover", this).stop().animate({left:'250px'},{queue:false,duration:300});
        }, function() {
            $(".cover", this).stop().animate({left:'0px'},{queue:false,duration:300});
        });

    });

});
