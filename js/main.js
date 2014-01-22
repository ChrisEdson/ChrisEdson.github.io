$('document').ready(function () {

    $.vegas('slideshow', {
        backgrounds:[
        {src: "img/slider/01.jpg",fade: 1e3},
        {src: "img/slider/02.jpg",fade: 1e3},
        {src: "img/slider/03.jpg",fade: 1e3},
        {src: "img/slider/04.png",fade: 1e3}
        ]
        })('overlay');

    $('.header-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        direction: "vertical",
        slideshowSpeed: 3000,
        animationSpeed: 500,
        pauseOnHover:false,
        pauseOnAction:false,
        smoothHeight: true
    });

});
