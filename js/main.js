/* Main javascript file; this runs the question launcher, but uses a variety of functions from graph.js and
helper-functions.js */

$('document').ready(function () {

    $('.unit-selection button').click(function() {
        var type = $(this).attr("data-type");
        $('.unit-selection').slideUp(250);
        $('#reset-buttons').slideDown(200);
        $('footer').addClass('expanded');
        $('.small').addClass('expanded');

        // Present the first question
        $('#' + type + '-questions').slideDown(250);

        $('html, body').animate({scrollTop: $(document).height()}, 500);

        // When miles submit button clicked
        $( "#miles" ).submit(function(event) {
            var mpw = parseFloat($('#mpw').val());
            var milesMins = parseInt($('#miles-mins').val());
            var milesSecs = parseFloat($('#miles-secs').val());
            var BF = parseFloat($('#miles-bf').val());

            var kpw = mpw * 1.609344;
            var secPerKM = (milesMins*60 + milesSecs) / 1.609344;

            var mpt = (11.03) + (98.46*(Math.exp(-0.0053*kpw))) + (0.387*secPerKM) + (0.1*(Math.exp(0.23*BF)));
            var hours = Math.floor(mpt / 60);
            var mins = Math.floor(mpt % 60);
            var secs = Math.round((mpt * 60) % 60);

            console.log(mpw, milesMins, milesSecs, BF);
            console.log(kpw, secPerKM, mpt);
            console.log(hours, mins, secs);

            // Error Checking
            var predictedText, predictedResult;
            if (isNaN(mpw) || isNaN(milesMins) || isNaN(milesSecs) || isNaN(BF)) {

                predictedText = "You mad man! I don't think you entered numbers above did you? Maybe try again. For me.";

                $('#results-box').slideDown(250);
                $('#predicted-text').html(predictedText);

            } else {

                predictedText = "<b>Your predicted marathon time is:</b>";
                predictedResult = "<p>" + hours + " hours " + mins + " minutes " + secs + " seconds</p>";

                $('#results-box').slideDown(250);
                $('#predicted-text').html(predictedText);
                $('#predicted-result').html(predictedResult);
            }

            event.preventDefault();
        });

        // When KM submit button clicked

        $( "#km" ).submit(function(event) {
            var kpw = parseFloat($('#kpw').val());
            var kmMins = parseInt($('#km-mins').val());
            var kmSecs = parseFloat($('#km-secs').val());
            var BF = parseFloat($('#km-bf').val());

            var secPerKM = (kmMins*60 + kmSecs);

            var mpt = (11.03) + (98.46*(Math.exp(-0.0053*kpw))) + (0.387*secPerKM) + (0.1*(Math.exp(0.23*BF)));
            var hours = Math.floor(mpt / 60);
            var mins = Math.floor(mpt % 60);
            var secs = Math.round((mpt * 60) % 60);

            console.log(mpw, kmMins, kmSecs, BF);
            console.log(kpw, secPerKM, mpt);
            console.log(hours, mins, secs);

            // Error Checking
            var predictedText, predictedResult;
            if (isNaN(kpw) || isNaN(kmMins) || isNaN(kmSecs) || isNaN(BF)) {

                predictedText = "You mad man! I don't think you entered numbers above did you? Maybe try again. For me.";

                $('#results-box').slideDown(250);
                $('#predicted-text').html(predictedText);

            } else {

                predictedText = "<b>Your predicted marathon time is:</b>";
                predictedResult = "<p>" + hours + " hours " + mins + " minutes " + secs + " seconds</p>";

                $('#results-box').slideDown(250);
                $('#predicted-text').html(predictedText);
                $('#predicted-result').html(predictedResult);
            }

            event.preventDefault();
        });

        // Reset buttons
        $('#reset-unit').click(function() {
            $('#showquestion>div').slideUp(250, function() {
                $('.unit-selection').slideDown(250);
            });
            $("input[type=text]").val("");
            $('#reset-buttons').slideUp(200);
            $('footer').removeClass('expanded');
            $('.small').removeClass('expanded');
        });

        $('#reset-questions').click(function() {
            $("input[type=text]").val("");
            $('#results-box').slideUp(250);
        });

    });

});
