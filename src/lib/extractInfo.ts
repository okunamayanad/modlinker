import { SearchResultInfo } from '../interfaces/searchResultInfo';

const supportedDomains = ['curseforge.com', '9minecraft.net'];

export function ExtractInfo(element: HTMLElement): SearchResultInfo | false {
  const titleContainer = element.firstChild as HTMLElement;
  const linkElement = titleContainer.querySelector(
    // check here if breaks on google update
    'div:nth-child(1) > div > div:nth-child(2) > div > div > span > a'
  );
  const link = linkElement?.getAttribute('href') || '';

  let domain = link.split('/')[2];
  if (domain === undefined) return false;
  if (domain.includes('www.')) {
    domain = domain.split('www.')[1];
  }
  if (!supportedDomains.includes(domain)) return false;

  switch (domain) {
    case 'curseforge.com':
      return CurseForgeHandler(link);

    case '9minecraft.net':
      return NineMinecraftHandler(link);

    default:
      return false;
  }
}

function CurseForgeHandler(link: string): SearchResultInfo | false {
  const modId = link.split('/')[5];
  if (modId === undefined) return false;

  return {
    modId: modId,
  };
}

function NineMinecraftHandler(link: string): SearchResultInfo | false {
  if (link.endsWith('/')) link = link.slice(0, -1); // remove trailing slash
  const splitLink = link.split('/');
  if (splitLink.length !== 4) return false;

  const modId = splitLink[splitLink.length - 1];
  if (modId === undefined) return false;

  return {
    modId: modId,
  };
}
