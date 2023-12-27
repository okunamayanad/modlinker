let cache = {};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("current request", request);
  console.log("current cache", cache);
  if (request[0] == "checkIfExists") {
    // check if cache exists
    if (cache[request[1]] !== undefined) {
      console.log("cache exists", cache[request[1]]);
      sendResponse(cache[request[1]]);
      return true;
    }
    fetch(request[1]).then(response => {
      console.log("response", response);
      if (response.status == 404) {
        cache[request[1]] = false;
        sendResponse(false);
      } else {
        cache[request[1]] = true;
        sendResponse(true);
      }
    }).catch(err => {
      console.log("error", err);
      sendResponse(false);
    })
  }
  return true
})

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
		url: 'https://modrinth.com',
	});
});
// void browser.tabs.create({
//   openerTabId: tab.id,
//   url: 'https://modrinth.com/',
// });
