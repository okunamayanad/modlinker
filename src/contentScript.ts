interface ICache {
  data: boolean;
  time: number;
}

let cache = new Map<string, ICache>();

const cacheTTL = 1000 * 60 * 60; // 1 hour

chrome.runtime.onMessage.addListener(function (
  request: string[],
  sender,
  sendResponse
) {
  switch (request[0]) {
    case 'cacheCheck':
      const cacheData = cache.get(request[1]);

      // Cache Hit
      if (cacheData !== undefined) {
        // Check if cache is expired
        if (cacheData.time + cacheTTL < Date.now()) {
          cache.delete(request[1]);
          return false;
        } else {
          sendResponse(cacheData.data);
          return true;
        }
      }

      // Cache Miss
      fetch(request[1])
        .then((response) => {
          cache.set(request[1], { data: response.ok, time: Date.now() });
          sendResponse(response.ok);
        })
        .catch((err) => {
          console.log('error', err);
          sendResponse(false);
        });
      break;

    default:
      break;
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'https://modrinth.com',
  });
});
