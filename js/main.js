/* Main javascript file; this runs the question launcher, but uses a variety of functions from graph.js and
helper-functions.js */

$('document').ready(function () {

    $('.unit-selection button').click(function() {
        var type = $(this).attr("data-type");
        $('.unit-selection').slideUp(150);
        $('#reset-buttons').slideDown(100);
        $('footer').addClass('expanded');
        $('.small').addClass('expanded');

        // Present the first question
        $('#' + type + '-questions').slideDown(150);

        $('html, body').animate({scrollTop: $(document).height()}, 500);

        // When miles submit button clicked
        $( "#miles" ).submit(function(event) {
            var mpw, milesMins, milesSecs, BF, kpw, secPerKM, mpt, hours, mins, secs;

            mpw = parseFloat($('#mpw').val());
            milesMins = parseInt($('#miles-mins').val(), 10);
            if ($('#miles-secs').val() === '') {
                milesSecs = 0;
            } else {
                milesSecs = parseFloat($('#miles-secs').val());
            }

            BF = parseFloat($('#miles-bf').val());

            kpw = mpw * 1.609344;
            secPerKM = (milesMins*60 + milesSecs) / 1.609344;

            mpt = (11.03) + (98.46*(Math.exp(-0.0053*kpw))) + (0.387*secPerKM) + (0.1*(Math.exp(0.23*BF)));
            hours = Math.floor(mpt / 60);
            mins = Math.floor(mpt % 60);
            secs = Math.round((mpt * 60) % 60);

            // Error Checking
            var predictedText, predictedResult, rangeError;
            if (isNaN(mpw) || isNaN(milesMins) || isNaN(milesSecs) || isNaN(BF)) {

                predictedText = "You mad man! I don't think you entered numbers properly above did you? Maybe try again. For me.";
                predictedResult = "";
                rangeError = "";

            } else {

                predictedText = "<b>Your predicted marathon time is:</b>";
                predictedResult = "<p>" + hours + " hours " + mins + " minutes " + secs + " seconds</p>";

                if (mpt < 165 || mpt > 266) {
                    rangeError = "n.b. This is outside the range that this calculator is accurate (2 hours 45 minutes to 4 hours 26 minutes). Maybe try entering in different values above.";
                } else {
                    rangeError = "";
                }

            }

            $('#results-box').slideDown(150);
            $('#predicted-text').html(predictedText);
            $('#predicted-result').html(predictedResult);
            $('#range-error').html(rangeError);

            event.preventDefault();
        });

        // When KM submit button clicked

        $( "#km" ).submit(function(event) {
            var kpw, kmMins, kmSecs, BF, secPerKM, mpt, hours, mins, secs;

            kpw = parseFloat($('#kpw').val());
            kmMins = parseInt($('#km-mins').val(), 10);
            if ($('#km-secs').val() === '') {
                kmSecs = 0;
            } else {
                kmSecs = parseFloat($('#km-secs').val());
            }

            BF = parseFloat($('#km-bf').val());

            secPerKM = (kmMins*60 + kmSecs);

            mpt = (11.03) + (98.46*(Math.exp(-0.0053*kpw))) + (0.387*secPerKM) + (0.1*(Math.exp(0.23*BF)));
            hours = Math.floor(mpt / 60);
            mins = Math.floor(mpt % 60);
            secs = Math.round((mpt * 60) % 60);

            // Error Checking
            var predictedText, predictedResult, rangeError;
            if (isNaN(kpw) || isNaN(kmMins) || isNaN(kmSecs) || isNaN(BF)) {

                predictedText = "You mad man! I don't think you entered numbers properly above did you? Maybe try again. For me.";
                predictedResult = "";
                rangeError = "";

            } else {

                predictedText = "<b>Your predicted marathon time is:</b>";
                predictedResult = "<p>" + hours + " hours " + mins + " minutes " + secs + " seconds</p>";

                if (mpt < 165 || mpt > 266) {
                    rangeError = "n.b. This is outside the range that this calculator is accurate (2 hours 45 minutes to 4 hours 26 minutes). Maybe try entering in different values above.";
                } else {
                    rangeError = "";
                }

            }

            $('#results-box').slideDown(150);
            $('#predicted-text').html(predictedText);
            $('#predicted-result').html(predictedResult);
            $('#range-error').html(rangeError);

            event.preventDefault();
        });

        // Reset buttons
        $('#reset-unit').click(function() {
            $('#showquestion>div').slideUp(150, function() {
                $('.unit-selection').slideDown(150);
            });
            $("input[type=text]").val("");
            $('#reset-buttons').slideUp(100);
            $('footer').removeClass('expanded');
            $('.small').removeClass('expanded');
        });

        $('#reset-questions').click(function() {
            $("input[type=text]").val("");
            $('#results-box').slideUp(150);
        });

    });

});
