$('document').ready(function () {

    // Activate scrolling
    $('#main-nav').onePageNav({
        changeHash: !1,
        scrollThreshold: 0.5,
        scrollSpeed: 750,
        filter: "",
        easing: "swing"
    });

    // Easter egg
    var clickiterate = 0;
    var popupMessage = [
        "Don't click me",
        "I'm serious",
        "What's your obsession with this?",
        "You're hurting my face",
        "What do you think this is? A game?",
        "Is life just a game to you?",
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
    $('.profile-picture').click(function () {
        // Only restart if at end and in original place
        if ($('.popup').html() == "Zzzzzzzzzzzzzz" && $('.popup').css("top") == "66px") {
            clickiterate=0;
        }

        $('.popup').html(popupMessage[clickiterate]);

        if (clickiterate < popupMessage.length) {
            clickiterate++;
        } else {
            // When at end of loop, display final message and bring popup up with a delay
            setTimeout(function () {
                $('.popup').animate({top: "66px"}, 2000).html("Zzzzzzzzzzzzzz");
            }, 1000);
        }

        // Only pop it up when in original position
        if ($('.popup').css("top") == "66px" && clickiterate<20) {
            $('.popup').animate({top: "222px"}, 200);
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
        $(this).next().css("left", ($(this).attr("aria-valuenow")-15)+'%');
    },
    {triggerOnce: !0,offset: "bottom-in-view"});

});
