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
  MakeModrinthButton(
    extractedInfo.modId,
    element.querySelector('div')!.firstElementChild!.firstElementChild!
      .firstElementChild! as HTMLElement,
    false // TODO: actually check white theme
  );
});
