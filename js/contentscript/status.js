function StatusController() {
    var globalContainerSelector = "#globalContainer";
    var hashtagContainerSelector = "a._58cn"; // <a> <span>#</span><span>contents...</span> </a>
    var hashtagSelector = "._58cl"; // <span>#</span>
    var statusBlockSelector = ".userContentWrapper";
    var statusContentSelector = statusBlockSelector + " p";
    var commentBlockSelector = statusBlockSelector + " .UFICommentBody";
    //#region ===================================== PRIVATE FUNCTIONS ===================================================
    // Implementation for a block content that contains hashtagContainerSelector elements
    function blockHandler(containers) {
        // containers is an array that contains hashtagContainerSelector elements
        var i;
        if (containers.length > 0) {
            for (i = 0; i < containers.length; i++) {
                if (containers[i].querySelector(hashtagSelector)) { // check hashtag class exists
                    var index = isEmotion(containers[i].innerText);
                    if (index > -1) { // implement for hashtag element itself
                        containers[i].innerHTML = getEmoticonHtml(emotionList, index);
                    }
                    if ((i == containers.length - 1) && (containers[i].parentElement)) { // implement for parentElement when this is the last element
                        replaceNormalHashtagHtml(containers[i].parentElement);
                    }
                }
            }
        }
    }
    function commentHandler(comments) {
        var i;
        for (i = 0; i < comments.length; i++) {
            var hashtagContainers = comments[i].querySelectorAll(hashtagContainerSelector);
            if (hashtagContainers.length > 0) blockHandler(hashtagContainers);
        }
    }
    // run once after document loaded
    function statusHandler(statuses) {
        var i, j;
        for (i = 0; i < statuses.length; i++) {
            var hashtagContents = statuses[i].querySelectorAll(hashtagContainerSelector);
            if (hashtagContents.length > 0 && emotionList.length > 0) {
                for (j = 0; j < hashtagContents.length; j++) {
                    var hashtagContent = hashtagContents[j].innerText;
                    var emotionIndex = isEmotion(hashtagContent);
                    if (emotionIndex > -1) {
                        hashtagContents[j].innerHTML = getEmoticonHtml(emotionList, emotionIndex);
                    }
                    if ((j == hashtagContents.length - 1) && (hashtagContents[j].parentElement)) { // implement for parentElement when this is the last element
                        replaceNormalHashtagHtml(hashtagContents[j].parentElement);
                    }
                }
            }
        }
    }
    //#endregion ===================================== END PRIVATE FUNCTIONS ===============================================

    //#region ========================================== PUBLIC FUNCTIONS ===============================================
    // first run for loaded contents
    this.loadedHandler = function () {
        statusHandler(document.querySelectorAll(statusContentSelector));
        commentHandler(document.querySelectorAll(commentBlockSelector));
    }
    this.runtimeHandler = function () {
        var i, j;
        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length == 0) return; // check added nodes
                var addedNodes = mutation.addedNodes;
                for (i = 0; i < addedNodes.length; i++) {
                    if (typeof (mutation.addedNodes[i].querySelector) != "function") return; // check is element
                    var statusBlocks = addedNodes[i].querySelectorAll(statusBlockSelector);
                    if (statusBlocks.length > 0) { // case status
                        for (j = 0; j < statusBlocks.length; j++) {
                            blockHandler(statusBlocks[j].querySelectorAll(hashtagContainerSelector));
                        }
                    }
                    else { // case comment
                        var commentBlocks = addedNodes[i].querySelectorAll(commentBlockSelector);
                        for (j = 0; j < commentBlocks.length; j++) {
                            blockHandler(commentBlocks[j].querySelectorAll(hashtagContainerSelector));
                        }
                    }
                }
            });
        });
        // configuration of the observer
        var config = {
            childList: true,
            subtree: true
        }
        var globalContainerInterval = setInterval(function () {
            var globalContainer = document.querySelector(globalContainerSelector); // observed target
            if (!globalContainer) return;
            observer.observe(globalContainer, config); // start observing
            clearInterval(globalContainerInterval);
        }, 500);
    }
    //#endregion ========================================== END PUBLIC FUNCTIONS ===========================================
}
