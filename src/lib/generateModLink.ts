import { SearchResultInfo } from '../interfaces/searchResultInfo';

const linkMap: Record<SearchResultInfo['type'], string[]> = {
  mod: ['https://modrinth.com/mod/', 'https://modrinth.com/mods?q='],
  plugin: ['https://modrinth.com/plugin/', 'https://modrinth.com/plugins?q='],
};

export async function generateModLink(info: SearchResultInfo): Promise<
  | {
      link: string;
      isOnModrinth: boolean;
    }
  | { error: true; errorMessage: string }
> {
  const isOnModrinth = await chrome.runtime.sendMessage([
    'cacheCheck',
    `https://api.modrinth.com/v2/project/${info.id}`,
  ]);

  if (isOnModrinth instanceof Error) {
    console.error('Error checking Modrinth:', isOnModrinth);
    return {
      error: true,
      errorMessage: 'Error checking Modrinth',
    };
  }

  const link = isOnModrinth
    ? `${linkMap[info.type][0]}${info.id}`
    : `${linkMap[info.type][1]}${info.id.replace(/[-_]/g, '+')}`;

  return {
    link,
    isOnModrinth,
  };
}
