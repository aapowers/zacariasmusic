import './slideshow.scss';
const $ = require( "jquery" );

$(document).ready(function() {
    let slideshows = $('[data-component="slideshow"]');
    $.each(slideshows, function( index, value ) {
        initSlideShow(value);
    });
});

function initSlideShow(slideshow) {
    let slides = $(`#${slideshow.id} [role="list"] .slide`); // Get an array of slides

    let index = 0, time = 5000;
    slides[index].classList.add('active');

    setInterval(() => {
        slides[index].classList.remove('active');
        index++;
        // If you go over all slides, restart the index to show the first slide and start again
        if (index === slides.length) index = 0;

        slides[index].classList.add('active');

    }, time);
}