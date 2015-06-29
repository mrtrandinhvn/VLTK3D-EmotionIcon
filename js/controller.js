function Controller() {
    // for global use
    this.EmotionList = [
        "ac",
        "biumoi",
        "botay",
        "buon",
        "buonngu",
        "choang",
        "chopchop",
        "cuong",
        "dacy",
        "dao",
        "dze",
        "eo",
        "ghet",
        "gian",
        "gianxao",
        "gru",
        "haha",
        "hehe",
        "heongoc",
        "hihi",
        "hon",
        "hungac",
        "imlang",
        "khinhmiet",
        "khoc",
        "kool",
        "kyla",
        "luoi",
        "matquy",
        "meumao",
        "mi",
        "mohoi",
        "mua",
        "ngaoman",
        "ngoc",
        "ngon",
        "ngu",
        "nguong",
        "nguyhiem",
        "oh",
        "oi",
        "sax",
        "so",
        "tay",
        "thich",
        "toi",
        "votay",
        "vui",
        "xaoquyet",
        "xauho",
		"bad",
		"battay",
		"bia",
		"chamthan",
		"chuoi",
		"win"
    ];
    // for local use
    var emotionList = this.EmotionList;

    this.onLoaded = function () {
        var loadedChatWindows = new ChatWindows();
        return loadedChatWindows.load();
    }
    this.onRunTime = function (changedElement) {
        var workingChatWindow = new ChatWindows();
        return workingChatWindow.load(changedElement);
    }
    // public function
    this.editSingleRow = function (rows) {
        for (var j = 0; j < rows.length; j++) {
            var replacedHtml = replaceHtml(rows[j]);
            if (replacedHtml) {
                $(rows[j]).html(replacedHtml);
            }
        }
    }

    // private functions
    function replaceHtml(rowSelector) {
        var outputHtml = $(rowSelector).html();
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
}
