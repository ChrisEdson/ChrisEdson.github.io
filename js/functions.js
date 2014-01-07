// Helper functions

// Create graph
function graph(type, nodeID, count) {

    // Filter data to get correct node ID data
    var mainDataFiltered = mainData[type].filter(function(row) {
        return row['Node'] == nodeID;
    });

    // Change the object in to usable values (array of numbers)
    mainDataFiltered = d3.values(mainDataFiltered[0]);

    // Create an object of arrays containing the pathway number, the node %, and the overall %
    var dataset = [];
    for (var i=0; i<mainDataFiltered.length-1; i++) {
        dataset.push([i+1, mainDataFiltered[i], overallDataset[type][i]]);
    }

    removeGraph();

    // Init vars
    var w = 1050;
    var h = 300;
    var yPadding = 65;
    var xPadding = 155;

    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0+xPadding, w-xPadding], 0.1);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            if (d[1]>=d[2]) {
                return d[1];
            }
            else {
                return d[2];
            }
        })])
        .range([yPadding, h-yPadding]);

    // Create SVG element
    var svg = d3.select(".chart-container")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "distribution");

    // Create bars
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .on("mouseover", hoverRect)
        .on("mouseout", unhoverRect)
        .attr("x", function (d) {
            return xScale(d[0]-1);
        })
        .attr("y", function (d) {
            return h - yScale(0);
        })
        .attr("width", xScale.rangeBand())
        .attr("height", 0)
        .attr("fill", function (d) {
            return barColours[type][d[0]];
        })
        .attr("stroke", "gray")
        .attr("stroke-width", "1")
        .attr("class", "similar");

    // Animate bars to rise up. For the bars, must change both the y position and the actual height
    svg.selectAll("rect")
        .transition()
        .delay(500)
        .duration(800)
        .attr("y", function (d) {
            return h - yScale(d[1]);
        })
        .attr("height", function (d) {
            return yScale(d[1])-yPadding;
        });

    // Create overall dataset path
    svg.append("path")
        .data([dataset])
        .attr("d", d3.svg.line()
        .x(function (d) {
            return xScale(d[0]-1) + xScale.rangeBand()/2;
        })
        .y(function (d) {
            return h - yScale(0);
        })
        .interpolate("cardinal"))
        .attr("class", "best-fit");

    // Animate path
    svg.select(".best-fit")
        .transition()
        .delay(500)
        .duration(800)
        .attr("d", d3.svg.line()
        .x(function (d) {
            return xScale(d[0]-1) + xScale.rangeBand()/2;
        })
        .y(function (d) {
            return h - yScale(d[2]);
        })
        .interpolate("cardinal"));

    // Create overall dataset circles (cx has xScale.rangeBand to position in the middle of the bars)
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .on("mouseover", hoverCircle)
        .on("mouseout", unhoverCircle)
        .attr("cx", function (d) {
            return xScale(d[0]-1) + xScale.rangeBand()/2;
        })
        .attr("cy", function (d) {
            return h - yScale(0);
        })
        .attr("fill", "white")
        .attr("r", "4")
        .attr("class", "overall");

    // Animate circles
    svg.selectAll("circle")
        .transition()
        .delay(500)
        .duration(800)
        .attr("cy", function (d) {
            return h - yScale(d[2]);
        });

    // Add legend
    var legend = svg.append("g")
        .attr("id", "legend")
        .attr("pointer-events", "none");

    // Set variables for legend placement
    var xLegend = xPadding*1.12;
    var yLegend = yPadding - 55;
    var xTextOffset = 32;
    var yTextOffset = 12;
    var lineOffset = 25;

    // Create first legend line
    legend.append("rect")
        .on("mouseover", hoverSimilar)
        .on("mouseout", unhoverSimilar)
        .attr("x", xLegend)
        .attr("y", yLegend)
        .attr("width", 25)
        .attr("height", 15)
        .attr("fill", "white")
        .attr("stroke", "gray")
        .attr("stroke-width", "2")
        .attr("pointer-events", "auto");

    legend.append("text")
        .on("mouseover", hoverSimilar)
        .on("mouseout", unhoverSimilar)
        .attr("x", xLegend + xTextOffset)
        .attr("y", yLegend + yTextOffset)
        .text("Distribution of Similar Patients");

    // Create second legend line
    var legendPath = [{
        x: xLegend,
        y: yLegend + lineOffset + 8
        }, {
        x: xLegend + 25,
        y: yLegend + lineOffset + 8
        }];

    legend.append("path")
        .data([legendPath])
        .attr("d", d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("linear"))
        .attr("class", "best-fit");

    legend.append("circle")
        .on("mouseover", hoverOverall)
        .on("mouseout", unhoverOverall)
        .attr("cx", xLegend + 12)
        .attr("cy", yLegend + lineOffset + 8)
        .attr("fill", "white")
        .attr("r", "4")
        .attr("pointer-events", "auto");

    legend.append("text")
        .attr("x", xLegend + xTextOffset)
        .attr("y", yLegend + yTextOffset + lineOffset)
        .text("Distribution of All Patients");

    var bbox = legend.node().getBBox();

    // Append surrounding rectangle for legend
    legend.insert("rect", ":first-child")
        .attr("class", "legend-rect")
        .attr("x", bbox.x - 7)
        .attr("y", bbox.y - 7)
        .attr("rx", 1)
        .attr("ry", 1)
        .attr("width", bbox.width + 14)
        .attr("height", bbox.height + 14);

    // Create x-axis manually
    var xAxis = [{
        x: xScale(0) - 5,
        y: h - yScale(0)
        }, {
        x: xScale(dataset.length-1) + xScale.rangeBand() + 5,
        y: h - yScale(0)
        }];

    svg.append("path")
        .data([xAxis])
        .attr("d", d3.svg.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .interpolate("linear"))
        .attr("class", "x-axis");

    // Add axis labels manually, using the main dataset
    svg.selectAll()
       .data(dataset)
       .enter()
       .append("text")
       .text(function (d) {
            return d[0];
       })
       .attr("text-anchor", "middle")
       .attr("class", "labels")
       .attr("x", function (d) {
            return xScale(d[0]-1) + xScale.rangeBand() / 2 - 1;
       })
       .attr("y", function (d) {
            return h - yScale(0) + 20;
       });

    survivalLabelsHelper(type, svg, xScale, h, yPadding);

    function hoverRect(d) {

        // Hover effect
        d3.select(this)
            .transition()
            .duration(150)
            .attr("fill", "rgb(140,198,62)")
            .attr("stroke-width", "2");

        //Get this x/y values, then augment for the tooltip
        var xPosRect = parseFloat(d3.select(this).attr("x"));
        var yPosRect = parseFloat(d3.select(this).attr("y"));

        var xPosTool = xPosRect + xScale.rangeBand()/2;
        var yPosTool = (yPosRect / 2 + h / 3) - 70;

        // Create tooltip group
        var tooltip = svg.append("g")
            .attr("id", "tooltip")
            .attr("pointer-events", "none")
            .attr("class", "tooltip-box");

        // Append three sets of text
        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("text-anchor", "middle")
            .text("Pathway "+d[0]+":");

        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("dy", "1.4em")
            .attr("text-anchor", "middle")
            .attr("font-style", "italic")
            .text(pathwayDescriptions[type][d[0]]);

        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("dy", "2.8em")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .text("Probability of Pathway: "+d[1]+"%");

        // Get range
        var bbox = tooltip.node().getBBox();

        // Append rectangle
        tooltip.insert("rect", ":first-child")
            .attr("class", "tooltip-rect")
            .attr("x", bbox.x - 7)
            .attr("y", bbox.y - 7)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("width", bbox.width + 14)
            .attr("height", bbox.height + 14);
    }

    function unhoverRect(d) {

        d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", function (d) {
            return barColours[type][d[0]];
            })
            .attr("stroke-width", "1");

        svg.select(".tooltip-box").remove();

    }

    function hoverCircle(d) {

        // Hover effect
        d3.select(this)
            .transition()
            .duration(150)
            .attr("r", "7");

        //Get this x/y values, then augment for the tooltip
        var xPosCirc = parseFloat(d3.select(this).attr("cx"));
        var yPosCirc = parseFloat(d3.select(this).attr("cy"));

        var xPosTool = xPosCirc;
        var yPosTool = (yPosCirc / 2 + h / 3) - 80;

        // Create tooltip group
        var tooltip = svg.append("g")
            .attr("id", "tooltip")
            .attr("pointer-events", "none")
            .attr("class", "tooltip-box");

        // Append three sets of text
        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("text-anchor", "middle")
            .text("Pathway "+d[0]+", All Patients:");

        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("dy", "1.4em")
            .attr("text-anchor", "middle")
            .attr("font-style", "italic")
            .text(pathwayDescriptions[type][d[0]]);

        tooltip.append("text")
            .attr("x", xPosTool)
            .attr("y", yPosTool)
            .attr("dy", "2.8em")
            .attr("text-anchor", "middle")
            .attr("font-weight", "bold")
            .text("Probability of Pathway, All Patients: "+d[2]+"%");

        // Get range
        var bbox = tooltip.node().getBBox();

        // Append rectangle
        tooltip.insert("rect", ":first-child")
            .attr("class", "tooltip-rect")
            .attr("x", bbox.x - 7)
            .attr("y", bbox.y - 7)
            .attr("rx", 5)
            .attr("ry", 5)
            .attr("width", bbox.width + 14)
            .attr("height", bbox.height + 14);
    }

    function unhoverCircle(d) {

        d3.select(this)
            .transition()
            .duration(250)
            .attr("r", "4");

        svg.select(".tooltip-box").remove();

    }

    function hoverSimilar() {
        svg.selectAll('.similar')
            .transition()
            .duration(150)
            .attr("x", function (d) {
                return xScale(d[0]-1)-1;
            })
            .attr("width", xScale.rangeBand()+2)
            .attr("y", function (d) {
                return h - yScale(d[1])-2;
            })
            .attr("height", function (d) {
                return yScale(d[1])-yPadding+2;
            });
    }

    function unhoverSimilar() {
        svg.selectAll('.similar')
            .transition()
            .duration(250)
            .attr("x", function (d) {
                return xScale(d[0]-1);
            })
            .attr("width", xScale.rangeBand())
            .attr("y", function (d) {
                return h - yScale(d[1]);
            })
            .attr("height", function (d) {
                return yScale(d[1])-yPadding;
            });
    }

    function hoverOverall() {
        svg.selectAll('.overall')
            .transition()
            .duration(150)
            .attr("r", "5");
    }

    function unhoverOverall() {
        svg.selectAll('.overall')
            .transition()
            .duration(350)
            .attr("r", "4");
    }

    // Get max probability of all pathways
    var probabilityArray = [];
    for (var x=0; x<mainDataFiltered.length-1; x++) {
        probabilityArray.push(mainDataFiltered[x]);
    }
    var maxProbability = getMaxOfArray(probabilityArray);

    // Get max odds of all pathways when compared to the overall dataset
    var oddsArray = [];
    for (var y=0; y<mainDataFiltered.length-1; y++) {
        oddsArray.push(mainDataFiltered[y]/overallDataset[type][y]);
    }
    var maxOdds = getMaxOfArray(oddsArray);

    // Apply bold to data label when highest
    svg.selectAll('.labels')
        .attr("font-weight", function (d) {
            if (d[0]==maxProbability[0]) {
                return "bold";
            }
            else {
                return null;
            }
        });

    // Get text to fill the div in with
    var answer = "The patient's most likely outcome is Pathway " + maxProbability[0] + ": <i>'" + pathwayDescriptions[type][maxProbability[0]] + "'.</i>";
    var answer2 = '<div  id="d' + count + '" class="results" style="display: none;"><p><b>' + answer + '</b></p>';

    var probability = "<p>The probability of a patient falling in this Pathway is <b>" + maxProbability[1] + "%</b>.</p>";
    var odds = "<p>Patients with these characteristics over-index most highly against the overall population at a ratio of <b>" + maxOdds[1].toFixed(1) + ":1</b> on Pathway " + maxOdds[0] + ": <i>'" + pathwayDescriptions[type][maxOdds[0]] + "'.</i></p>";

    var explanation = "<p>The graph below shows the distribution of Pathways for patients with these characteristics (bars) and also of all "+type+" cancer patients (line). Hover over the chart to see descriptions of each Pathway.</p>";

    // Get previous showquestion html
    var qs = $('#showquestion').html();
    // Concatenate them
    var r = qs + answer2 + probability + odds + explanation + '</div>';

    // Set the 'showed question' element to be r. Animate in the final box.
    $('#showquestion').html(r);
    $('#d' + count).slideDown(250);

    var complicationText = complicationLevels(type, mainDataFiltered.length-1, dataset);
    var implicationText = "<div class='twisty closed implications-wrap' style='display:none;'><div class='twistyClosed'><i>Click to reveal the implications for management of this patient</i></div><div><p>For a patient with the identified characteristics, the following approach is recommended: xxx</p></div>";
    $('.chart-container').append(complicationText);
    $('.chart-container').append(implicationText);
    $('.complications-wrap').slideDown(250);
    $('.implications-wrap').slideDown(250);

    // Set complication value to be colour coded depending on how high it is
    $('.complication-value').each(function() {
        var value = $(this).text().replace('%','');
        if (value < 25) {
            $(this).attr("class", "green");
        }
        else if (value < 50) {
            $(this).attr("class", "orange");
        }
        else {
            $(this).attr("class", "red");
        }
    });

    // Apply twisty plugin
    $('div.twisty').twisty();

    // Scroll to end of page once graph loaded
    $('html, body').animate({scrollTop: $(document).height()}, 700);
}

// Check if graph present - if so, remove it
function removeGraph() {
    if ($('.distribution')) {
        $('.distribution, .complications-wrap, .implications-wrap').remove();
    }
}

// Helper function to get max of dataset and it's pathway
function getMaxOfArray(array) {
    var pathway = array.indexOf(Math.max.apply(null,array))+1;
    var odds = Math.max.apply(null, array);
    return [pathway, odds];
}

// Complication level code
function complicationLevels(type, length, dataset) {

    // Function to get each complication level
    function complicationLevel(complication){
        var level = 0;
        for (var i=0; i<length; i++) {
            level = level + (complicationBreakdown[type][i+1][complication]*dataset[i][1]);
        }
        // This accounts for when stage IV has been selected as an answer
        if (complication=="Metastases" && $('#showquestion .selected:contains("Stage IV")').length > 0) {
            return 100;
        }
        else {return level;}
    }

    // Create an object with the complication level of each morbidity relevant for the cancer
    var complicationObj = {};
    for (var complication in complicationBreakdown[type][1]) {
        complicationObj[complication] = complicationLevel(complication);
    }

    // Create the text to go in the div
    var complicationText = '<div class="twisty closed complications-wrap" style="display:none;"><div class="twistyClosed"><i>Click to reveal the probability of a patient acquiring complications</i></div><div><table class="table">';
    for (complication in complicationObj) {
        complicationText = complicationText + "<tr><td></td><td class='td-text'>" + complication + "</td><td class='complication-value'><b>" + complicationObj[complication].toFixed(1) + "%</b></td></tr>";
    }
    complicationText = complicationText + "</table><p class='comp-info'><span class='orange'>Orange</span> indicates a complication risk of over 25%; <span class='red'>red</span> indicates over 50%</p></div></div>";

    return complicationText;
}

function survivalLabelsHelper(type, svg, xScale, h, yPadding) {

    var survivalLabelLength = Object.keys(survivalLabels[type]).length;
    var survivalLabel, survivalLabelPath;

    for (var i=1; i<=survivalLabelLength; i++) {

        // Add label
        survivalLabel = svg.append("g")
                            .attr("id", "survivalLabel" + i);

        survivalLabel.append("text")
            .attr("x", (xScale(survivalLabels[type][i][1]) + xScale(survivalLabels[type][i][2]-1))/2)
            .attr("y", h - yPadding + 50)
            .text(survivalLabels[type][i][0])
            .attr("text-anchor", "middle");

        // Add line
        survivalLabelPath = [{
            x: xScale(survivalLabels[type][i][1]) - xScale.rangeBand() / 2 - 4,
            y: h - yPadding + 35
            }, {
            x: xScale(survivalLabels[type][i][2]-1) + xScale.rangeBand() / 2,
            y: h - yPadding + 35
            }];

        survivalLabel.append("path")
            .data([survivalLabelPath])
            .attr("d", d3.svg.line()
            .x(function (d) {
                return d.x;
            })
            .y(function (d) {
                return d.y;
            })
            .interpolate("linear"))
            .attr("class", "survival-label");
    }

}