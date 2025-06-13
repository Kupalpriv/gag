export interface StockItem {
  name: string;
  value: number;
}

export interface StockData {
  gearStock: StockItem[];
  seedsStock: StockItem[];
  eggStock: StockItem[];
  honeyStock: StockItem[];
  cosmeticsStock: StockItem[];
}

export interface WeatherData {
  currentWeather: string;
  icon: string;
  cropBonuses: string;
  updatedAt: string;
}

export interface RestockTimers {
  egg: string;
  gear: string;
  seed: string;
  honey: string;
  cosmetics: string;
}