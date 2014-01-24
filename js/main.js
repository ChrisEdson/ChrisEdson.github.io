$('document').ready(function () {

    // Activate top slideshow
    $.vegas('slideshow', {
        backgrounds:[
        {src: "img/slider/01.jpg",fade: 1000},
        {src: "img/slider/02.jpg",fade: 1000},
        {src: "img/slider/03.jpg",fade: 1000},
        {src: "img/slider/04.png",fade: 1000}
        ]
        })('overlay');

    var clickiterate = 0;
    var popupMessage = [
        "Don't click me",
        "I'm serious",
        "What's your obsession with this?",
        "You're hurting my face",
        "What do you think this is?",
        "Is life just a game to you?",
        "I can keep going longer than you can",
        "I'm serious, the guy who wrote this is a dull guy",
        "Like, he spent a while typing responses",
        "Probably too long",
        "He could have spent that time helping the homeless",
        "Or at least, thinking about helping the homeless",
        "But no, he didn't, all because of you",
        "Yeh, you made him do this",
        "Sort of",
        "I'm sorry",
        "There's just a lot going on right now, I need space",
        "It's not me, it's you",
        "Ok, going to sleep now",
        "Winding down"
        ];
    $('.profile-picture').click(function() {
        $('.popup').html(popupMessage[clickiterate]);
        clickiterate++;
        // Only pop it up when in original position
        if ($('.popup').css("top")=="66px") {
            $('.popup').animate({top: "222px"}, 200);
        }
        // When at end of loop, display final message
        if (clickiterate==20) {
            $('.popup').delay(300).animate({top: "66px"}, 200);
            clickiterate=0;
        }

    });

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
