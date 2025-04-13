import { ICache } from './interfaces/cache';

let cache = new Map<string, ICache>();

const cacheTTL = 1000 * 60 * 60; // 1 hour

chrome.runtime.onMessage.addListener(function (
  request: string[],
  sender,
  sendResponse
) {
  switch (request[0]) {
    case 'cacheCheck':
      console.log('cache', cache);

      const cacheData = cache.get(request[1]);
      console.log('cacheData', cacheData);

      // Cache Hit
      if (cacheData !== undefined) {
        console.log('cacheHit');
        // Check if cache is expired
        if (cacheData.time + cacheTTL < Date.now()) {
          cache.delete(request[1]);
        } else {
          sendResponse(cacheData.data);
          break;
        }
      }

      // Cache Miss
      fetch(request[1])
        .then((response) => {
          console.log('response', response);
          cache.set(request[1], { data: response.ok, time: Date.now() });
          sendResponse(response.ok);
        })
        .catch((err: Error) => {
          console.log('fetch error', err);
          console.log('error', err);
          sendResponse(err);
        });
      return true; // Will respond asynchronously

    default:
      break;
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({
    url: 'https://modrinth.com',
  });
});
