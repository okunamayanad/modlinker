import { SearchResultInfo } from '../interfaces/searchResultInfo';

const supportedDomainHandlers: Record<
  string,
  (link: string) => SearchResultInfo | false
> = {
  'curseforge.com': CurseForgeHandler,
  '9minecraft.net': NineMinecraftHandler,
  'planetminecraft.com': PlanetMinecraftHandler,
  'tlauncher.org': TLauncherHandler,
  'spigotmc.org': SpigotMCHandler,
  'dev.bukkit.org': BukkitHandler,
};

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

  if (supportedDomainHandlers[domain] === undefined) return false;
  return supportedDomainHandlers[domain](link);
}

// https://www.curseforge.com/minecraft/mc-mods/create
function CurseForgeHandler(link: string): SearchResultInfo | false {
  const type = link.split('/')[4];
  if (type !== 'mc-mods' && type !== 'bukkit-plugins') return false;

  const id = link.split('/')[5];
  if (id === undefined) return false;

  return {
    type: type === 'mc-mods' ? 'mod' : 'plugin',
    modId: id,
  };
}

// https://www.9minecraft.net/fabric-api
function NineMinecraftHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (splitLink.length !== 4) return false;

  const modId = splitLink[splitLink.length - 1];
  if (modId === undefined) return false;

  return {
    type: 'mod',
    modId: modId,
  };
}

// https://www.planetminecraft.com/mods/tag/create
function PlanetMinecraftHandler(link: string): SearchResultInfo | false {
  if (!link.includes('/mods/tag/')) return false;

  const splitLink = link.split('/');
  if (splitLink.length !== 6) return false;

  const modId = splitLink[splitLink.length - 1];
  if (modId === undefined) return false;

  return {
    type: 'mod',
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
    type: 'mod',
    modId: splitModId.join('-'),
  };
}

// https://www.spigotmc.org/resources/skinsrestorer.2124
// https://www.spigotmc.org/resources/skinsrestorer.2124/updates
function SpigotMCHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (!splitLink.includes('resources')) return false;

  const resourcesIndex = splitLink.indexOf('resources');

  const modId = splitLink[resourcesIndex + 1].split('.')[0];
  if (modId === undefined) return false;

  return {
    type: 'plugin',
    modId: modId,
  };
}

// https://dev.bukkit.org/projects/grief-prevention
// https://dev.bukkit.org/projects/grief-prevention/images
function BukkitHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (!splitLink.includes('projects')) return false;

  const projectsIndex = splitLink.indexOf('projects');

  const modId = splitLink[projectsIndex + 1];
  if (modId === undefined) return false;

  return {
    type: 'plugin',
    modId: modId,
  };
}
