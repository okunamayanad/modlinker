chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request[0] == "checkIfExists") {
    // if 404 error, return false
    fetch(request[1]).then(response => {
      console.log("response", response);
      if (response.status == 404) {
        sendResponse(false);
      } else {
        sendResponse(true);
      }
    }).catch(err => {
      console.log("error", err);
      sendResponse(false);
    })
  }
  return true
})