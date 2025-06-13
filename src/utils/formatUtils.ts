export const formatQuantity = (quantity: number): string => {
  if (quantity >= 1000000) {
    return `${(quantity / 1000000).toFixed(1)}M`;
  }
  if (quantity >= 1000) {
    return `${(quantity / 1000).toFixed(1)}K`;
  }
  return quantity.toString();
};

export const formatLastUpdated = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatCountdown = (countdown: string): string => {
  
  return countdown;
};

export const getRarityColor = (rarity: string): string => {
  const lowerRarity = rarity.toLowerCase();
  
  if (lowerRarity.includes('common')) {
    return 'text-gray-600';
  }
  if (lowerRarity.includes('uncommon')) {
    return 'text-green-600';
  }
  if (lowerRarity.includes('rare')) {
    return 'text-blue-600';
  }
  if (lowerRarity.includes('epic')) {
    return 'text-purple-600';
  }
  if (lowerRarity.includes('legendary') || lowerRarity.includes('mythical')) {
    return 'text-yellow-600';
  }
  
  return 'text-gray-600';
};
