import { useState, useEffect } from 'react';
import { StockData, WeatherData, RestockTimers } from '../types';
import { getNextRestocks, getPHTime } from '../utils/timeUtils';

const mockStockData: StockData = {
  gearStock: [
    { name: "Watering Can", value: 245 },
    { name: "Trowel", value: 189 },
    { name: "Recall Wrench", value: 67 },
    { name: "Basic Sprinkler", value: 143 },
    { name: "Advanced Sprinkler", value: 89 },
    { name: "Godly Sprinkler", value: 23 },
    { name: "Lightning Rod", value: 156 },
    { name: "Master Sprinkler", value: 45 },
    { name: "Favorite Tool", value: 78 },
    { name: "Harvest Tool", value: 234 }
  ],
  seedsStock: [
    { name: "Carrot", value: 1567 },
    { name: "Strawberry", value: 892 },
    { name: "Blueberry", value: 445 },
    { name: "Orange Tulip", value: 234 },
    { name: "Tomato", value: 667 },
    { name: "Corn", value: 389 },
    { name: "Daffodil", value: 156 },
    { name: "Watermelon", value: 234 },
    { name: "Pumpkin", value: 89 },
    { name: "Apple", value: 445 },
    { name: "Bamboo", value: 123 },
    { name: "Coconut", value: 67 },
    { name: "Cactus", value: 234 },
    { name: "Dragon Fruit", value: 45 },
    { name: "Mango", value: 178 },
    { name: "Grape", value: 567 },
    { name: "Mushroom", value: 234 },
    { name: "Pepper", value: 89 },
    { name: "Cacao", value: 156 },
    { name: "Beanstalk", value: 78 }
  ],
  eggStock: [
    { name: "Common Egg", value: 789 },
    { name: "Uncommon Egg", value: 345 },
    { name: "Rare Egg", value: 123 },
    { name: "Legendary Egg", value: 45 },
    { name: "Mythical Egg", value: 12 },
    { name: "Bug Egg", value: 67 }
  ],
  honeyStock: [
    { name: "Wild Honey", value: 234 },
    { name: "Golden Honey", value: 89 },
    { name: "Crystal Honey", value: 45 },
    { name: "Royal Jelly", value: 23 }
  ],
  cosmeticsStock: [
    { name: "Garden Hat", value: 45 },
    { name: "Farmer Overalls", value: 23 },
    { name: "Muddy Boots", value: 67 },
    { name: "Flower Crown", value: 34 },
    { name: "Straw Hat", value: 56 },
    { name: "Gardening Gloves", value: 78 }
  ]
};

const mockWeatherData: WeatherData = {
  currentWeather: "Sunny",
  icon: "☀️",
  cropBonuses: "All crops +15% growth speed",
  updatedAt: new Date().toISOString()
};

export function useStockData() {
  const [stockData, setStockData] = useState<StockData>(mockStockData);
  const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [restockTimers, setRestockTimers] = useState<RestockTimers>(getNextRestocks());
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRestockTimers(getNextRestocks());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      
      setStockData(prev => ({
        ...prev,
        gearStock: prev.gearStock.map(item => ({
          ...item,
          value: Math.max(0, item.value + Math.floor(Math.random() * 21) - 10)
        })),
        seedsStock: prev.seedsStock.map(item => ({
          ...item,
          value: Math.max(0, item.value + Math.floor(Math.random() * 101) - 50)
        }))
      }));
      setLastUpdated(new Date());
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate fresh data
    setStockData(prev => ({
      ...prev,
      gearStock: prev.gearStock.map(item => ({
        ...item,
        value: Math.max(0, Math.floor(Math.random() * 500))
      }))
    }));
    
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  return {
    stockData,
    weatherData,
    restockTimers,
    isLoading,
    lastUpdated,
    refreshData
  };
}
