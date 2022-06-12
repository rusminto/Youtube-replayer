# Youtube-replayer
Firefox extension to replay video on youtube


## Try it
https://addons.mozilla.org/firefox/downloads/file/3961462/dc15b92efc8e478c994b-1.0.xpi


### Installation steps
- download code
- open about:debugging in firefox
- click "This Firefox" > "Load Temporary Add-on"
- select manifest.json inside download directory  


### Another setup on incognito
- open about:addons in firefox
- click "Replay Youtube"
- click "Allow"


### Usage
- open youtube
- select video
- click "Replay Youtube" addon
- set percentage of video where video will be stopped and replayed
- click toggle till blue
- if at start toggle already blue, reclick toggle


### Need Improvement
- debounce on input
- show current percentage
- at start, "toggle" & "percentage" not only use stored data but also actual data
- get current percentage of video without minimize it
- block ads


### References
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension

