import './navbar.scss';
const $ = require( "jquery" );

$(document).ready(function() {
    $('#about-nav').on('click', function(){
        goToByScroll('about');
        return false;
    });
    $('#music-nav').on('click', function(){
        goToByScroll('music');
        return false;
    });
    $('#connect-nav').on('click', function(){
        goToByScroll('connect');
        return false;
    });
});

function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}