$(document).ready(function () {
    var controller = new Controller();
    var result1 = controller.onLoaded();
    if (result1) {
        if (result1.chatRow.length) {
            for (var i = 0; i < result1.chatRow.length; i++) {
                editSingleRow(result1.chatRow[i]);
            }
        }
    }

    $(document).on("DOMNodeInserted", ".conversation", function (event) {
        var changedElement = event.target;
        var result2 = controller.onRunTime(changedElement);
        if (result2) {
            if (result2.chatRow.length) {
                for (var m = 0; m < result2.chatRow.length; m++) {
                    editSingleRow(result2.chatRow[m]);
                }
            }
        }
    });

    // private functions
    function editSingleRow(rows) {
        for (var j = 0; j < rows.length; j++) {
            var replacedHtml = replaceHtml(rows[j]);
            if (replacedHtml) {
                $(rows[j]).html(replacedHtml);
            }
        }
    }

    function replaceHtml(rowSelector) {

        var outputHtml = $(rowSelector).html();
        var emotionList = controller.EmotionList;
        if (outputHtml.includes("#")) { // check hashtag
            for (var j = 0; j < emotionList.length; j++) {
                var emoHtml = "<span class='emoticon emoticon_" + emotionList[j] + "'></span>";
                // check contain right emotion tag
                var emoTag = "#" + emotionList[j];
                var afterHasTagWord = outputHtml.indexOf(emoTag) + emotionList[j].length + 1; // +1 for '#'
                var regex = new RegExp("[a-zA-Z0-9]");
                if (
                    outputHtml.includes(emoTag + " ")
                        || !outputHtml.charAt(afterHasTagWord).match(regex)
                        || outputHtml.length == afterHasTagWord
                ) {
                    // replace text with image
                    outputHtml = replaceAll(outputHtml, emoTag, emoHtml);
                }
            }
            return outputHtml;
        }
        return null;
    }

    // replace all 'find' = 'replace' in 'inputStr'
    function replaceAll(inputStr, find, replace) {
        return inputStr.replace(new RegExp(find, 'g'), replace);
    }
});