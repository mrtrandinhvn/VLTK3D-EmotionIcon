function ChatWindows() {
    // for global call
    this.Data = {};

    // local variable
    var data = {
        conversations: [],
        chatRow: []
    }
    this.load = function (changedElement) {
        if (changedElement) {
            // new message arrives
            data.chatRow.push($(changedElement).find('span')); // ._5YL5 SPAN
        } else {
            // load all messages
            data.conversations = $(".conversation");
            for (var i = 0; i < data.conversations.length; i++) {
                data.chatRow.push($(data.conversations[i]).find("._5yl5 span"));
            }
        }
        // save to global variable
        this.Data = data;
        return this.Data;
    }
}