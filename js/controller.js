function Controller() {
    // database
    var emotionList = [
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
    var appManifest = chrome.runtime.getManifest();
    // =========================== public function ================================

    // return an object has this extension's manifest value
    this.getManifest = function () {
        return appManifest;
    }
    // getter - return a string array
    this.EmotionList = function () {
        return emotionList;
    }
    // run when document ready
    this.onLoaded = function () {
        var status = new Status(emotionList);
        status.onLoaded();
        var loadedChatWindows = new ChatWindows();
        return loadedChatWindows.load();
    }

    this.onRunTime = function (changedElement) {
        var workingChatWindow = new ChatWindows();
        return workingChatWindow.load(changedElement);
    }

    this.editSingleRow = function (rows) {
        for (var j = 0; j < rows.length; j++) {
            var replacedHtml = replaceHtml(rows[j]);
            if (replacedHtml) {
                $(rows[j]).html(replacedHtml);
            }
        }
    }

    this.generateHomePage = function (selector) {
        $(selector).append("<div>Current version: " + appManifest.version + "</div>");
        for (var i = 0; i < emotionList.length; i++) {
            var oneRowHtml = "<div class='one-row'><span class='emoticon emoticon_" + emotionList[i] + "'></span><span class='text'>" + "#" + emotionList[i] + "</span></div>";
            $(selector).append(oneRowHtml);
        }
    }

    // private functions
    function replaceHtml(rowSelector) {
        var outputHtml = $(rowSelector).html();
        if (outputHtml.includes("#")) { // check hashtag
            for (var j = 0; j < emotionList.length; j++) {
                var emoHtml = "<span class='emoticon emoticon_" + emotionList[j] + "' title='#" + emotionList[j] + "'></span>";
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

    this.addRuntimeHandler = function () {
        console.log("addRuntimeHandler");
        var i;
        var globalContainer = document.querySelector("#globalContainer");
        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var containers = mutation.target.querySelectorAll("a._58cn");
                if (containers.length > 0) {
                    console.log("------------------------------------------");
                    for (i = 0; i < containers.length; i++) {
                        if (containers[i].querySelectorAll("span").length == 2) {
                            var index = isEmotionHashtag(containers[i].innerText);
                            if (index > -1) {
                                console.log(containers[i]);
                                containers[i].innerHTML = getEmoticonHtml(emotionList, index);
                            }
                        }
                    }
                }
            });
        });

        // configuration of the observer:
        var config = {
            childList: true,
            subtree: true
        }
        // pass in the target node, as well as the observer options
        observer.observe(globalContainer, config);
    }

    // return index of that string if exists in array, else return -1
    function contains(array, str) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == str) {
                return i;
            }
        }
        return -1;
    }

    function isEmotionHashtag(hashtagString) {
        return contains(emotionList, hashtagString.replace(/\W+/gi, "")); // remove '#' and special character
    }
    function getEmoticonHtml(list, index) {
        return "<span class='emoticon emoticon_" + list[index] + "' title='#" + list[index] + "'></span>";
    }
}
