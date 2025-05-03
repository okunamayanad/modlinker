interface ModInfo {
  type: 'mod';
  modId: string;
}

interface PluginInfo {
  type: 'plugin';
  modId: string;
}

export type SearchResultInfo = ModInfo | PluginInfo;
