function Controller() {
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
		"win",
	];


    this.onLoaded = function () {
        var loadedChatWindows = new ChatWindows();
        return loadedChatWindows.load();
    }
    this.onRunTime = function (changedElement) {
        var workingChatWindow = new ChatWindows();
        return workingChatWindow.load(changedElement);
    }
}
