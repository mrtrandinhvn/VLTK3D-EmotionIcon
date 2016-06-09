var appManifest = chrome.runtime.getManifest();
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
    "win",
    "bua",
    "cf",
    "chamhoi",
    "daulau",
    "den",
    "dendo",
    "denvang",
    "denxanh",
    "dua",
    "duahau",
    "good",
    "heo",
    "hoa",
    "hoahong",
    "kem",
    "mattrang",
    "mattroi",
    "phaohoa",
    "qua",
    "ruou",
    "tannat",
    "tien",
    "tim"
].sort(function (a, b) {
    return a.localeCompare(b);
});
function replaceHtml(selector, emotionIndex) {
    $(selector).html(getEmoticonHtml(emotionList, emotionIndex));
}
// get used emoticon hashtags in an element's innerHTML
function getUsedHashtagList(innerHtml) {
    var i;
    var hashtagReg = RegExp(/#\w+/gi);
    var matches = innerHtml.match(hashtagReg);
    var result = [];
    if (matches && matches.length > 0) {
        for (i = 0; i < matches.length; i++) {
            if (!(contains(result, matches[i]) > -1) && (isEmotion(matches[i]) > -1)) { // insert distinct emoticon hashtag into result array
                result.push(matches[i]);
            }
        }
    }
    return result;
}
// #sax -> <span>...</span>
// target is a DOMElement
function replaceNormalHashtagHtml(target) {
    var i;
    var innerHtml = target.innerHTML;
    var hashtagList = getUsedHashtagList(innerHtml);
    for (i = 0; i < hashtagList.length; i++) {
        var emoIndex = isEmotion(hashtagList[i]);
        var reg = new RegExp(hashtagList[i] + "\\b", "gi");
        innerHtml = innerHtml.replace(reg, getEmoticonHtml(emotionList, emoIndex));
    }
    if (target.innerHTML != innerHtml) { // avoid re-set innerHTML which trigger the change event
        target.innerHTML = innerHtml;
    }
    return target;
}
function isEmotion(hashtagString) {
    return contains(emotionList, hashtagString.replace(/\W+/gi, "")); // remove \"#\" and special characters
}
// return index of that string if exists in array, else return -1
function contains(array, str) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == str.toLowerCase()) {
            return i;
        }
    }
    return -1;
}
function getEmoticonHtml(list, index) {
    return "<span class=\"emoticon emoticon_" + list[index] + "\" title=\"" + list[index] + "\"></span>";
}
// <=> $(document).ready(function(){});
function onDocumentReady(callback, callbackArgs) {
    if (typeof (callback) !== "function") return;
    if (document.readyState !== "complete") {
        document.onreadystatechange = function () {
            if (document.readyState !== "complete") return;
            callback(callbackArgs);
        }
    }
    else {
        callback(callbackArgs);
    }
}