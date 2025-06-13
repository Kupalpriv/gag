export interface StockItem {
  name: string;
  quantity: number;
  image: string;
}

export interface StockCategory {
  items: StockItem[];
  countdown: string;
}

export interface StockData {
  gear: StockCategory;
  egg: StockCategory;
  seed: StockCategory;
  honey: StockCategory;
  cosmetics: StockCategory;
  updated_at: string;
}

export interface ApiResponse {
  status: string;
  updated_at: string;
  data: StockData;
}

export interface WeatherData {
  icon: string;
  description: string;
  visualCue: string;
  cropBonuses: string;
  mutations: string[];
  rarity: string;
  updatedAt: number;
  currentWeather: string;
  weatherType: string;
  effectDescription: string;
}

export type FilterType = 'all' | 'gear' | 'egg' | 'seed' | 'honey' | 'cosmetics';
