// src/hooks/useStockData.ts
import { useState, useEffect } from 'react';
import { ApiResponse, StockData, WeatherData } from '../types';

const proxy = 'https://corsproxy.io/?';
const STOCK_API_URL = proxy + 'https://gagstock.gleeze.com/grow-a-garden';
const WEATHER_API_URL = proxy + 'https://growagardenstock.com/api/stock/weather';

export const useStockData = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchStockData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(STOCK_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.status === 'success') {
        setStockData(data.data);
        setLastUpdated(data.updated_at);
      } else {
        throw new Error('API returned error status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stock data');
      console.error('Error fetching stock data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(WEATHER_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }
  };

  useEffect(() => {
    fetchStockData();
    fetchWeatherData();

    const interval = setInterval(() => {
      fetchStockData();
      fetchWeatherData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    fetchStockData();
    fetchWeatherData();
  };

  return {
    stockData,
    weatherData,
    loading,
    error,
    lastUpdated,
    refreshData
  };
};
