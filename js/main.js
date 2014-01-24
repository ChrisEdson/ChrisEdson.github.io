$('document').ready(function () {

    // Activate top slideshow
    // $.vegas('slideshow', {
    //     backgrounds:[
    //     {src: "img/slider/01.jpg",fade: 1000},
    //     {src: "img/slider/02.jpg",fade: 1000},
    //     {src: "img/slider/03.jpg",fade: 1000},
    //     {src: "img/slider/04.png",fade: 1000}
    //     ]
    //     })('overlay');


    // Activate pie charts
    $(".chart").waypoint(function() {
        $(this).easyPieChart({barColor: "#3498db",size: "150",easing: "easeOutBounce",onStep: function(e, i, a) {
            $(this.el).find(".percent").text(Math.round(a))
        }})
    },
    {triggerOnce: !0,offset: "bottom-in-view"});

    // Activate bar charts
    $(".progress-bar").waypoint(function() {
        $(this).css("width", $(this).attr("aria-valuenow")+'%');
    },
    {triggerOnce: !0,offset: "bottom-in-view"});

});
