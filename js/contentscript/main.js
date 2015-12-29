(function () {
    var statuses = new StatusController();
    statuses.runtimeHandler();
    var chatWindows = new ChatWindows();
    chatWindows.runtimeHandler();
    onDocumentReady(function () {
        statuses.loadedHandler();
        chatWindows.loadedHandler();
    });
})();