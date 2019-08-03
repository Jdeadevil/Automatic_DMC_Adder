// ==UserScript==
// @name         PCStitch > Stitcher AutoShop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  simple userscript that adds all your required threads from your PCStitch Export
// @author       You
// @match        https://www.stitcher.co.uk/threads/dmc-stranded-cotton.cshtml
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';


    // create the container
    $("#inTableColor").before("<div class=\"new-forms\" style=\"padding-bottom: 15px;\"></div>");

    // fill the container
    $(".new-forms").append("<textarea class=\"dmc_1\" style=\"margin: 0 20px; width:40%;\" rows=\"4\" cols=\"50\">Copy Column A here!</textarea>")
    $(".new-forms").append("<textarea class=\"dmc_2\" style=\"margin: 0 20px; width:40%;\" rows=\"4\" cols=\"50\">Copy Column E here!</textarea>")
    $(".new-forms").append("<br> <p style=\"font-weight: bold; margin-top:3px;\">Please ensure your chart colours are up to date!</p> <button style=\"margin-top: 8px; padding:2px; \" type=\"button\">Process</button>");


    // process both columns into lists (dmc_colours, dmc_threads)

    var path_to_tr = $("#inTableColor > tbody > tr > td > table > tbody > tr");

    $(".new-forms button").click(function(){

        var dmc_colours = $('.dmc_1').val().split('\n');
        var dmc_threads = $('.dmc_2').val().split('\n');

        for (var i = 0; i < dmc_colours.length; i++) {
            dmc_colours[i] = dmc_colours[i].replace(/DMC\s/,"");
        }

        for (var a = 0; a < dmc_threads.length; a++){
            dmc_threads[a] = dmc_threads[a][0];
            dmc_threads[a]++;
        }

        for (var b = 0; b < dmc_colours.length; b++) {
            for (var c = 0; c < path_to_tr.length; c++) {
                var entry_from_column_a = dmc_colours[b];
                var entry_from_column_b = dmc_threads[b];
                var colour_code =  Number(path_to_tr[c].children[0].innerText);
                var current_input_field = path_to_tr[c].children[3].firstChild.value;

                if (entry_from_column_a == colour_code) {
                        current_input_field = entry_from_column_b;
                }
            }
        }

        alert("First Array: " + dmc_colours + " And now the second Array: " + dmc_threads);

    });

    // increment textfields



    console.log(allCells.length);

})();
