function Status(emotionList) {
    // for global use =================

    // for local use =================
    var hashtagList = $(document).find("._58cn");
    // public function
    this.onLoaded = function () {
        if (hashtagList.length > 0 && emotionList.length > 0) {
            for (var i = 0; i < hashtagList.length; i++) {
                var hashtagContent = $(hashtagList[i]).find("._58cm").html();
                var emotionIndex = inArray(hashtagContent, emotionList);
                if (emotionIndex > -1) {
                    replaceHtml(hashtagList[i], emotionIndex);
                }
            }
        }
    }

    // private functions =================
    function replaceHtml(selector, emotionIndex) {
        $(selector).html("<span class='emoticon emoticon_" + emotionList[emotionIndex] + "'></span>");
    }

    // check if array [array] contain string [str]
    // return index of that string if exists in array, else return -1
    function inArray(str, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].localeCompare(str) === 0) {
                return i;
            }
        }
        return -1;
    }
}
