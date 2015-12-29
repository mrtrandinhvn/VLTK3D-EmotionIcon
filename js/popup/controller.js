function Controller() {
    this.initialize = function (selector) {
        document.querySelector(selector).innerHTML += ("<div>Current version: " + appManifest.version + "</div>");
        for (var i = 0; i < emotionList.length; i++) {
            var oneRowHtml = "<div class='one-row'><span class='emoticon emoticon_" + emotionList[i] + "'></span><input class='text' disabled value=\"" + "#" + emotionList[i] + "\"></div>";
            document.querySelector(selector).innerHTML += oneRowHtml;
        }
    }
}