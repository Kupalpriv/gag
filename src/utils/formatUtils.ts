export function formatValue(val: number): string {
  if (val >= 1_000_000) return `x${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `x${(val / 1_000).toFixed(1)}K`;
  return `x${val}`;
}

export function addEmoji(name: string): string {
  const emojis: Record<string, string> = {
    "Common Egg": "🥚",
    "Uncommon Egg": "🐣",
    "Rare Egg": "🍳",
    "Legendary Egg": "🪺",
    "Mythical Egg": "🥚",
    "Bug Egg": "🪲",
    "Watering Can": "🚿",
    "Trowel": "🛠️",
    "Recall Wrench": "🔧",
    "Basic Sprinkler": "💧",
    "Advanced Sprinkler": "💦",
    "Godly Sprinkler": "⛲",
    "Lightning Rod": "⚡",
    "Master Sprinkler": "🌊",
    "Favorite Tool": "❤️",
    "Harvest Tool": "🌾",
    "Carrot": "🥕",
    "Strawberry": "🍓",
    "Blueberry": "🫐",
    "Orange Tulip": "🌷",
    "Tomato": "🍅",
    "Corn": "🌽",
    "Daffodil": "🌼",
    "Watermelon": "🍉",
    "Pumpkin": "🎃",
    "Apple": "🍎",
    "Bamboo": "🎍",
    "Coconut": "🥥",
    "Cactus": "🌵",
    "Dragon Fruit": "🍈",
    "Mango": "🥭",
    "Grape": "🍇",
    "Mushroom": "🍄",
    "Pepper": "🌶️",
    "Cacao": "🍫",
    "Beanstalk": "🌱"
  };
  return `${emojis[name] || "🎮"} ${name}`;
}