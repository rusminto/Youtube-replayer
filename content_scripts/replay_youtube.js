(() => {

    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
    */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    window.percentage_threshold = 95;
    window.loop_replay;

    function runReplay(){
        // minimize video, so i can see video slider
        // perhaps it'll be more nice if i can control ytp-autohide
        isVideoOpen = !document.getElementById("player-container").hasChildNodes();
        if(isVideoOpen){
            document.dispatchEvent(new KeyboardEvent("keydown",{key:"i", keyCode: 73}));
        }

        // get percentage of played video
        pointer = document.getElementsByClassName("ytp-scrubber-button")[0].getBoundingClientRect();
        slide = document.getElementsByClassName("ytp-timed-markers-container")[0].getBoundingClientRect();
        percentage = ((pointer.x - slide.x)/slide.width)*100

        // if more than threshold then replay video
        if(percentage >= window.percentage_threshold){
            document.dispatchEvent(new KeyboardEvent("keydown",{key:"0", keyCode: 48}));
        }
        console.log(parseInt(percentage),"%");

        window.loop_replay = setTimeout(() => {
            runReplay() 
        }, 1000);
    }

    /**
     * Listen for messages from the background script.
     * Call "insertBeast()" or "removeExistingBeasts()".
     */
    browser.runtime.onMessage.addListener((message) => {
        console.log(message);
        if (message.command === "toggle") {
            if(message.message){
                runReplay() 
            }else{
                if(clearTimeout){
                    clearTimeout(window.loop_replay)
                }
            }
        } else if (message.command === "percentage") {
            window.percentage_threshold = parseInt(message.message)
        }
    });
})();
