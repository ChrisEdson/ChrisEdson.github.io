$('document').ready(function () {

    // Activate scrolling
    $('#main-nav').onePageNav({
        changeHash: !1,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"
    });

    $('.marquee').addClass('animation');

    // Easter egg
    var clickiterate = 0;
    var clickiterateTwo = 0;
    var secret = false;
    var popupMessage = [
        "Don't click me",
        "I'm serious",
        "What's your obsession with this?",
        "You're hurting my face",
        "What do you think this is? A game?",
        "Right, so life just a game to you?",
        "I can keep going longer than you can",
        "I'm serious, the guy who wrote this is a dull guy",
        "Like, he spent a while typing responses",
        "Probably too long",
        "He could have spent that time helping the homeless",
        "Or thinking about helping the homeless",
        "But no, he didn't, all because of you",
        "Yeh, you made him do this",
        "Sort of",
        "I'm sorry",
        "There's just a lot going on right now, I need space",
        "It's not me, it's you",
        "Ok, going to sleep now",
        "Winding down"
        ];
    var popupMessageTwo = [
        "WHY DO YOU INSIST, DEMON?",
        "Ok, you win",
        "I am now a cat"
    ];

    $('.profile-picture, .profile-picture-hover').click(function () {
        // First popup
        if (secret === false) {
            // Only restart if at end and in original place
            if ($('.popup').html() == "Zzzzzzzzzzzzzz" && $('.popup').css("top") == "-180px") {
                clickiterate=0;
            }

            $('.popup').html(popupMessage[clickiterate]);

            if (clickiterate < popupMessage.length) {
                clickiterate++;
            } else {
                // When at end of loop, display final message and bring popup up with a delay
                secret = true;
                setTimeout(function () {
                    $('.popup').animate({top: "-180px"}, 2000).html("Zzzzzzzzzzzzzz");
                }, 800);
            }

            // Only pop it up when in original position
            if ($('.popup').css("top") == "-180px" && clickiterate<20) {
                $('.popup').animate({top: "-46px"}, 200);
            }
        } else {
            // Second popup
            $('.popup-two').animate({top: "-340px"}, 200);
            $('.popup-two').html(popupMessageTwo[clickiterateTwo]);
            clickiterateTwo++;
            if (clickiterateTwo == popupMessageTwo.length) {
                $('.profile-picture').css("background", "url('img/profile-cat.jpg') no-repeat");
                $('.profile-picture-hover-text').html("I hope you're happy");
            }
        }

    });

    // Activate pie charts
    $(".chart").waypoint(function() {
        $(this).easyPieChart({barColor: "#3498db",size: "150",easing: "easeOutBounce",onStep: function(e, i, a) {
            $(this.el).find(".percent").text(Math.round(a));
        }});
    },
    {triggerOnce: !0,offset: "bottom-in-view"});

    // Activate bar charts
    $(".progress-bar").waypoint(function() {
        $(this).css("width", $(this).attr("aria-valuenow")+'%');
        $(this).next().css("left", ($(this).attr("aria-valuenow")-15)+'%');
    },
    {triggerOnce: !0,offset: "bottom-in-view"});

    var e = $(".portfolio");
    e.isotope({filter: "*",animationOptions: {duration: 750,easing: "linear",queue: !1}});

    $(".portfolio").magnificPopup({delegate: "a",type: "image",gallery: {enabled: !0}});

});


