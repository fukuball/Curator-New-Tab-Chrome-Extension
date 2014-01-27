function shuffle(o) { //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
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

            /*$('#girl-image').imagesLoaded( function() {
                $('body').css('display', 'block');
            });*/

        }

    });

}

function getGirls() {

    getGirlStream();

}

$(document).ready(function() {

    $(document.body).off('click.google_search_btn', '.google-search-btn');
    $(document.body).on('click.google_search_btn', '.google-search-btn', function() {
        var google_search = "http://www.google.com.tw/#q="+$('#speech-input-field').val();
        window.location = google_search;
    });
    
    getGirls();

});