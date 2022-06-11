
// show error message if not on youtube
browser.tabs.query({active: true, currentWindow: true})
.then((tabs) => {
    if(!JSON.stringify(tabs[0].url).includes("youtube.com")){
        document.getElementById("popup-content").classList.remove("flex-center");
        document.getElementById("popup-content").classList.add("hidden");
        document.getElementById("error-content").classList.remove("hidden");
    }
})

// Check storage to restore data
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get("percentage").then((val) => {
        document.getElementById("percentage").value = val.percentage || 95
    })

    browser.storage.local.get("toggle").then((val) => {
        document.getElementById("toggle").checked = !!val.toggle
    })
});

function listenForClicks() {

    document.getElementById("percentage").addEventListener("input", (e)=> {
        browser.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {
            percentage = document.getElementById("percentage").value
            browser.storage.local.set({ percentage });
            browser.tabs.sendMessage(tabs[0].id, {
                command: "percentage",
                message: percentage
            }).catch(err => {
                alert(err)
            })
        })
        .catch((error) => {
            alert(error);
        });

        e.preventDefault();
    })

    document.getElementById("toggle").addEventListener("input", (e)=> {
        browser.tabs.query({active: true, currentWindow: true})
        .then((tabs) => {
            toggle = document.getElementById("toggle").checked
            browser.storage.local.set({ toggle }) 
            browser.tabs.sendMessage(tabs[0].id, {
                command: "toggle",
                message: toggle
            }).catch(err => {
                alert(err)
            })
        })
        .catch((error) => {
            alert(error);
        });

        e.preventDefault();
    })
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/replay_youtube.js"})
.then(listenForClicks)
.catch((error) => {
    console.log(`Failed to execute replay_youtube content script: ${error.message}`);
});
