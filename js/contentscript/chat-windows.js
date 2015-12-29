function ChatWindows() {
    var chatContainerSelector = "#ChatTabsPagelet";
    var windowsSelector = ".conversation";
    var rowContainerSelector = "._5yl5";
    //#region ========================================== PUBLIC FUNCTIONS ===============================================
    this.initialize = function () {
        loadedHandler();
        runtimeHandler();
    }
    this.runtimeHandler = function () {
        var i;
        //var chatContainer = document.querySelector(chatContainerSelector);
        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // get added rows
                if ((mutation.addedNodes.length === 1) && (typeof (mutation.addedNodes[0].querySelector) == "function") && mutation.addedNodes[0].querySelector(rowContainerSelector)) {
                    var chatRows = mutation.addedNodes[0].querySelectorAll(rowContainerSelector);
                    for (i = 0; i < chatRows.length; i++) {
                        replaceNormalHashtagHtml(chatRows[i]);
                    }
                }
            });
        });
        // configuration of the observer:
        var config = {
            childList: true,
            subtree: true
        }
        var chatContainerInterval = setInterval(function () {
            var globalContainer = document.querySelector(chatContainerSelector); // observed target
            if (!globalContainer) return;
            observer.observe(globalContainer, config); // start observing
            clearInterval(chatContainerInterval);
        }, 500);
    }
    // first run for loaded content
    this.loadedHandler = function () {
        var chatWindows = document.querySelectorAll(chatContainerSelector + " " + windowsSelector);
        var i, j;
        if (!(chatWindows.length > 0)) return;
        for (i = 0; i < chatWindows.length; i++) {
            var chatRows = chatWindows[i].querySelectorAll(rowContainerSelector);
            for (j = 0; j < chatRows.length; j++) {
                replaceNormalHashtagHtml(chatRows[j]);
            }
        }
    }
    //#endregion ========================================== END PUBLIC FUNCTIONS ===========================================
}