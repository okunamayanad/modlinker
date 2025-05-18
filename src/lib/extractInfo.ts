import { SearchResultInfo } from '../interfaces/searchResultInfo';

const supportedDomainHandlers: Map<
  string,
  (link: string) => SearchResultInfo | false
> = new Map([
  ['curseforge.com', CurseForgeHandler],
  ['9minecraft.net', NineMinecraftHandler],
  ['planetminecraft.com', PlanetMinecraftHandler],
  ['tlauncher.org', TLauncherHandler],
  ['spigotmc.org', SpigotMCHandler],
  ['dev.bukkit.org', BukkitHandler],
]);

export function ExtractInfo(element: HTMLElement): SearchResultInfo | false {
  const titleContainer = element.firstChild as HTMLElement;
  const linkElement = titleContainer.querySelector('a') as HTMLAnchorElement;
  let link = linkElement?.getAttribute('href') || '';
  console.log('link', link);

  if (link.endsWith('/')) link = link.slice(0, -1); // remove trailing slash

  let domain = link.split('/')[2];
  console.log('domain', domain);

  if (domain === undefined) return false;
  if (domain.includes('www.')) {
    domain = domain.split('www.')[1];
  }

  if (!supportedDomainHandlers.has(domain)) return false;
  return supportedDomainHandlers.get(domain)!(link);
}

const curseforgeTypeMap: Map<string, SearchResultInfo['type']> = new Map([
  ['mc-mods', 'mod'],
  ['bukkit-plugins', 'plugin'],
  ['modpacks', 'modpack'],
]);

// https://www.curseforge.com/minecraft/mc-mods/create
function CurseForgeHandler(link: string): SearchResultInfo | false {
  console.log('handling curseforge link', link);

  const type = link.split('/')[4];
  if (!curseforgeTypeMap.has(type)) return false;
  console.log('type', type);

  const id = link.split('/')[5];
  if (id === undefined) return false;

  return {
    type: curseforgeTypeMap.get(type)!,
    id,
  };
}

// https://www.9minecraft.net/fabric-api
function NineMinecraftHandler(link: string): SearchResultInfo | false {
  const splitLink = link.split('/');
  if (splitLink.length !== 4) return false;

  const id = splitLink[splitLink.length - 1];
  if (id === undefined) return false;

  return {
    type: 'mod',
    id,
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
    id: modId,
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
    id: splitModId.join('-'),
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
    id: modId,
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
    id: modId,
  };
}
