import { SearchResultInfo } from './interfaces/searchResultInfo';
import { ExtractInfo } from './lib/extractInfo';
import { generateModLink } from './lib/generateModLink';
import { MakeModrinthButton } from './lib/makeModrinthButton';

let searchResults: HTMLElement[] = [];

document.querySelectorAll('#rso div.MjjYud').forEach((element) => {
  console.log('test');

  // if (element.parentElement?.className === 'ULSxyf') return; // some other google element
  searchResults.push(element as HTMLElement);
});

console.log('searchResults', searchResults);

searchResults.forEach((element) => {
  if (element.childElementCount === 0) return; // for some random reason sometimes the element has no children
  let extractedInfo;
  try {
    extractedInfo = ExtractInfo(element.querySelector('div > div > div')!);
  } catch (error) {
    console.error('Error extracting info:', error);
    return;
  }
  
  console.log('extractedInfo', extractedInfo);
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

    const modrinthLink = await generateModLink(extractedInfo);

    if ('error' in modrinthLink) {
      modrinthButton.classList.add('button-modlinker-error');
      return;
    }

    modrinthButton.classList.add(
      modrinthLink.isOnModrinth
        ? 'button-modlinker-valid'
        : 'button-modlinker-warning'
    );

    modrinthButton.setAttribute('href', modrinthLink.link);
  })();
});
