export const formatItemName = (name: string): string => {
  return name.replace(/([A-Z])/g, ' $1').trim();
};

export const formatQuantity = (quantity: number): string => {
  if (quantity === 0) return 'Out of Stock';
  if (quantity === 1) return '1 item';
  return `${quantity} items`;
};

export const getCategoryDisplayName = (category: string): string => {
  const categoryNames: Record<string, string> = {
    gear: '⚙️ Gear',
    egg: '🥚 Eggs',
    seed: '🌱 Seeds',
    honey: '🍯 Honey',
    cosmetics: '✨ Cosmetics'
  };
  
  return categoryNames[category] || category;
};

export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    gear: '⚙️',
    egg: '🥚',
    seed: '🌱',
    honey: '🍯',
    cosmetics: '✨'
  };
  
  return icons[category] || '📦';
};

export const getStockStatus = (quantity: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= 2) return 'low-stock';
  return 'in-stock';
};