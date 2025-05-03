import { ExtractInfo } from './lib/extractInfo';
import { MakeModrinthButton } from './lib/makeModrinthButton';

let searchResults: HTMLElement[] = [];

document.querySelectorAll('#rso div.MjjYud').forEach((element) => {
  if (element.parentElement?.className === 'ULSxyf') return; // some other google element
  searchResults.push(element as HTMLElement);
});

searchResults.forEach((element) => {
  if (element.childElementCount === 0) return; // for some random reason sometimes the element has no children
  const extractedInfo = ExtractInfo(element.querySelector('div > div > div')!);
  if (extractedInfo === false) return;

  console.log('element', element);
  console.log('extractedInfo', extractedInfo);

  // add the modrinth button
  const modrinthButtonContainer = MakeModrinthButton(
    extractedInfo.modId,
    element.querySelector('div')!.firstElementChild!.firstElementChild!
      .firstElementChild! as HTMLElement,
    window.getComputedStyle(document.body).backgroundColor ===
      'rgb(255, 255, 255)'
  );

  (async () => {
    const modrinthButton =
      modrinthButtonContainer.querySelector('.button-modlinker')!;
    console.log('modrinthButton', modrinthButton);

    const isOnModrinth = await chrome.runtime.sendMessage([
      'cacheCheck',
      `https://api.modrinth.com/v2/project/${extractedInfo.modId}`,
    ]);

    if (isOnModrinth instanceof Error) {
      console.error('Error checking Modrinth:', isOnModrinth);

      modrinthButton.classList.add('button-modlinker-error');
      return;
    }

    modrinthButton.classList.add(
      isOnModrinth ? 'button-modlinker-valid' : 'button-modlinker-warning'
    );

    modrinthButton.setAttribute(
      'href',
      isOnModrinth
        ? `https://modrinth.com/mod/${extractedInfo.modId}`
        : `https://modrinth.com/mods?q=${extractedInfo.modId.replace(
            /[-_]/g,
            '+'
          )}`
    );
  })();
});
