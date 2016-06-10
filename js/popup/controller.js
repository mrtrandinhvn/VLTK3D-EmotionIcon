function Controller() {
    this.initialize = function (selector) {
        document.querySelector(selector).innerHTML += ("<div>Phiên bản: " + appManifest.version + "</div>");
        document.querySelector(selector).innerHTML += ("<div>- Đổi biểu tượng #choang và #hon cho chuẩn.</div>");
        document.querySelector(selector).innerHTML += ("<div>- Thêm một vài biểu tượng mới.</div>");
        for (var i = 0; i < emotionList.length; i++) {
            var oneRowHtml = "<div class='one-row'><span class='emoticon emoticon_" + emotionList[i] + "'></span><input class='text' disabled value=\"" + "#" + emotionList[i] + "\"></div>";
			if(emotionList[i] == ":v"){
				oneRowHtml = "<div class='one-row'><span class='emoticon emoticon_pacman'></span><input class='text' disabled value=\":v\"></div>";
			}
            document.querySelector(selector).innerHTML += oneRowHtml;
        }
    }
}