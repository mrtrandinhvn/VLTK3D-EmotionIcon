$(document).ready(function () {
    var i;
    var controller = new Controller();
    var result1 = controller.onLoaded();
    if (result1) {
        if (result1.chatRow.length) {
            for (i = 0; i < result1.chatRow.length; i++) {
                controller.editSingleRow(result1.chatRow[i]);
            }
        }
    }

    $(document).on("DOMNodeInserted", ".conversation", function (event) {
        var changedElement = event.target;
        var result2 = controller.onRunTime(changedElement);
        if (result2) {
            if (result2.chatRow.length) {
                for (var m = 0; m < result2.chatRow.length; m++) {
                    controller.editSingleRow(result2.chatRow[m]);
                }
            }
        }
    });
    // Add runtime handler for status and comment sections
    controller.addRuntimeHandler();
});