import { SearchResultInfo } from '../interfaces/searchResultInfo';

const supportedDomains = [
  'curseforge.com',
  '9minecraft.net',
  'planetminecraft.com',
  'tlauncher.org',
];

export function ExtractInfo(element: HTMLElement): SearchResultInfo | false {
  const titleContainer = element.firstChild as HTMLElement;
  const linkElement = titleContainer.querySelector(
    // check here if breaks on google update
    'div:nth-child(1) > div > div:nth-child(2) > div > div > span > a'
  );
  let link = linkElement?.getAttribute('href') || '';
  if (link.endsWith('/')) link = link.slice(0, -1); // remove trailing slash

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

    case 'planetminecraft.com':
      return PlanetMinecraftHandler(link);

    case 'tlauncher.org':
      return TLauncherHandler(link);

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

// https://www.9minecraft.net/fabric-api/
function NineMinecraftHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (splitLink.length !== 4) return false;

  const modId = splitLink[splitLink.length - 1];
  if (modId === undefined) return false;

  return {
    modId: modId,
  };
}

// https://www.planetminecraft.com/mods/tag/create/
function PlanetMinecraftHandler(link: string): SearchResultInfo | false {
  if (!link.includes('/mods/tag/')) return false;

  const splitLink = link.split('/');
  if (splitLink.length !== 6) return false;

  const modId = splitLink[splitLink.length - 1];
  if (modId === undefined) return false;

  return {
    modId: modId,
  };
}

// https://tlauncher.org/en/mods-1165_115/netherite-scrap-from-piglin-brutes-1-16-5_26425.html
function TLauncherHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (splitLink.length !== 6) return false;

  if (!splitLink[4].includes('mods')) return false;

  let modId = splitLink[splitLink.length - 1].split('_')[0];
  if (modId === undefined) return false;

  let splitModId = modId.split('-');

  for (let i = splitModId.length - 1; i >= 0; i--) {
    const element = splitModId[i];

    if (!isNaN(Number(element))) {
      splitModId.splice(i, 1);
    } else {
      break;
    }
  }

  return {
    modId: splitModId.join('-'),
  };
}
