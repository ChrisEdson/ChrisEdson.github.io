/* Main javascript file; this runs the question launcher, but uses a variety of functions from graph.js and
helper-functions.js */

$('document').ready(function () {

    $('.cancer-selection button').click(function() {
        var type = $(this).attr("data-type");
        $('.cancer-selection').slideUp(250);
        $('#reset-buttons').slideDown(200);
        $('footer').addClass('expanded');
        $('.small').addClass('expanded');

        // Present the first question
        var count = 0;
        $('#' + type + '-questions tr:nth-child(1)').attr('id', 'currow');
        var q1 = $('#currow td:nth-child(2)').html();
        var q3 = '<div id="d0" style="display: none;"><p><b>' + q1 + '</b></p>';
        var a1 = $('#currow td:nth-child(3)').html();
        var r1 = q3 + a1 + '</div>';

        $('#showquestion').html(r1);
        $('#d0').slideDown(250);
        $('html, body').animate({scrollTop: $(document).height()}, 500);

        // When answer clicked
        $('li').live('click',function () {
            removeGraph();

            // Add selected class to clicked answer and remove it from any siblings
            $(this).addClass('selected').siblings().removeClass('selected');

            // Get answer ID
            var answerID = $(this).attr('data-question');

            // Get ID of this question
            var parid = $(this).parent().parent().attr('id');
            var parnum = parseInt(parid.slice(1, 4), 10);

            count = count + 1;

            // For each question shown, if the question number is greater than the ID of current clicked question, remove it
            $('#showquestion div').each(function () {
                var divid = $(this).attr('id');
                var divnum = parseInt(divid.slice(1, 4), 10);
                if (divnum > parnum) {
                    $(this).remove();
                }
            });

            // If answer is a terminal node (i.e. if the ID has 'T' in it), then output graph
            if (answerID.indexOf("T") >= 0) {
                var nodeID = parseInt(answerID.slice(1, 4), 10);
                graph(type, nodeID, count);
                return;
            }

            // For each td (that is within the cancer specific table), run through this
            $('#'+type+'-questions td' ).each(function (){
                var qnum = $(this).text();
                // If question number equals the answer ID, then do the following
                if (qnum == answerID) {

                    // Get question
                    var q = $(this).next('td').html();
                    var q2 = '<div id="d' + count + '" style="display: none;"><p><b>' + q + '</b></p>';
                    // Get list of answers
                    var a = $(this).next('td').next('td').html();
                    // Get previous showquestion html
                    var qs = $('#showquestion').html();
                    // Concatenate them all
                    var r = qs + q2 + a +'</div>';

                    // Set the 'showed question' element to be r. Animate in the new question.
                    $('#showquestion').html(r);
                    $('#d' + count).slideDown(250);

                    // Scroll to end of page
                    $('html, body').animate({scrollTop: $(document).height()}, 500);
                }
            });

        });

        // Reset buttons
        $('#reset-cancer').click(function() {
            $('#showquestion div').slideUp(250, function() {
                $('#showquestion').empty();
                $('#currow').removeAttr('id');
                r1 = "";
                $('.cancer-selection').slideDown(250);
            });
            $('#reset-buttons').slideUp(200);
            $('footer').removeClass('expanded');
            $('.small').removeClass('expanded');
            removeGraph();
        });

        $('#reset-questions').click(function() {

            if ($("#showquestion div").length==1) {
                return;
            }

            $('#showquestion').html(r1);
            $('#d0').slideDown(250);
            removeGraph();
            $('html, body').animate({scrollTop: $(document).height()}, 500);
        });

    });

});
