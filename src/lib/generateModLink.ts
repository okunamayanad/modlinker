import { SearchResultInfo } from '../interfaces/searchResultInfo';

const linkMap: Record<SearchResultInfo['type'], string[]> = {
  mod: ['https://modrinth.com/mod/', 'https://modrinth.com/mods?q='],
  plugin: ['https://modrinth.com/plugin/', 'https://modrinth.com/plugins?q='],
};

export async function generateModLink(info: SearchResultInfo) {
  const isOnModrinth = await chrome.runtime.sendMessage([
    'cacheCheck',
    `https://api.modrinth.com/v2/project/${info.modId}`,
  ]);

  if (isOnModrinth instanceof Error) {
    console.error('Error checking Modrinth:', isOnModrinth);
    return 'err';
  }

  const link = isOnModrinth
    ? `${linkMap[info.type][0]}${info.modId}`
    : `${linkMap[info.type][1]}${info.modId.replace(/[-_]/g, '+')}`;

  return {
    link,
    isOnModrinth,
  };
}
